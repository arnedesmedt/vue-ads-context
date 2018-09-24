<template>
    <div
        class="relative"
    >
        <div
            ref="button"
            class=""
            @click.stop="toggle"
            @mouseenter="toggle"
            @mouseleave="toggle"
        >
            <slot name="button"/>
        </div>
        <div
            ref="context"
            :class="contextClasses"
            :style="contextStyles"
            class="absolute z-50"
        >
            <slot name="context"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueAdsContext',

    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false,
        },

        disable: {
            type: Boolean,
            required: false,
            default: false,
        },

        toggleOnHover: {
            type: Boolean,
            required: false,
            default: false,
        },

        verticalPosition: {
            type: String,
            required: false,
            default: 'top-bottom',
        },

        horizontalPosition: {
            type: String,
            required: false,
            default: 'middle-middle',
        },
    },

    data () {
        return {
            isVisible: this.visible,
            button: {
                width: null,
                height: null,
            },
            context: {
                width: null,
                height: null,
            },
        };
    },

    computed: {
        contextClasses () {
            let classes = {
                invisible: this.disable || !this.isVisible,
            };

            return classes;
        },

        contextStyles () {
            let left = 0;
            let top = 0;

            if (this.horizontalPosition.startsWith('middle')) {
                left += this.button.width / 2;
            }

            if (this.horizontalPosition.startsWith('right')) {
                left += this.button.width;
            }

            if (this.horizontalPosition.endsWith('middle')) {
                left -= this.context.width / 2;
            }

            if (this.horizontalPosition.endsWith('right')) {
                left -= this.context.width;
            }

            if (this.verticalPosition.startsWith('middle')) {
                top += this.button.height / 2;
            }

            if (this.verticalPosition.startsWith('bottom')) {
                top += this.button.height;
            }

            if (this.verticalPosition.endsWith('middle')) {
                top -= this.context.height / 2;
            }

            if (this.verticalPosition.endsWith('bottom')) {
                top -= this.context.height;
            }

            let styles = {
                left: left + 'px',
                top: top + 'px',
            };

            return styles;
        },
    },

    mounted () {
        this.calculateDimensions();
    },

    methods: {
        toggle (event) {
            if (
                (event.type === 'click' && this.toggleOnHover) ||
                (event.type === 'mouseenter' && !this.toggleOnHover) ||
                (event.type === 'mouseleave' && !this.toggleOnHover)
            ) {
                return;
            }

            if (event.type === 'click' && !this.toggleOnHover) {
                if (this.isVisible) {
                    document.body.removeEventListener('click', this.toggle);
                } else {
                    document.body.addEventListener('click', this.toggle);
                }
            }

            this.isVisible = !this.isVisible;
        },

        calculateDimensions () {
            let buttonRect = this.$refs.button.getBoundingClientRect();
            this.button.width = buttonRect.width;
            this.button.height = buttonRect.height;

            let contextRect = this.$refs.context.getBoundingClientRect();
            this.context.width = contextRect.width;
            this.context.height = contextRect.height;
        },
    },
};
</script>
