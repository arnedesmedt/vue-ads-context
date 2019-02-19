<template>
    <div
        class="vue-ads-relative"
    >
        <div
            ref="button"
            @click.stop="click"
            @mouseenter.stop="toggle"
            @mouseleave.stop="toggle"
        >
            <slot name="button" />
        </div>
        <div
            ref="context"
            @click.stop="clickContext"
            @mouseenter.stop="toggle"
            @mouseleave.stop="toggle"
            :class="contextClasses"
            :style="contextStyles"
            class="vue-ads-absolute vue-ads-z-50"
        >
            <slot name="context" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueAdsContext',

    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        disable: {
            type: Boolean,
            default: false,
        },

        toggleOnHover: {
            type: Boolean,
            default: false,
        },

        verticalPosition: {
            type: String,
            default: 'top-bottom',
        },

        horizontalPosition: {
            type: String,
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
            return {
                'vue-ads-invisible': this.disable || !this.isVisible,
            };
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

            return {
                left: left + 'px',
                top: top + 'px',
            };
        },
    },

    mounted () {
        this.calculateDimensions();
    },

    methods: {
        toggle () {
            if (!this.toggleOnHover) {
                return;
            }

            this.isVisible = !this.isVisible;
        },

        click () {
            if (this.toggleOnHover) {
                return;
            }

            if (this.isVisible) {
                document.body.removeEventListener('click', this.click);
            } else {
                document.body.addEventListener('click', this.click);
            }

            this.isVisible = !this.isVisible;
        },

        clickContext () {

        },

        calculateDimensions () {
            let buttonRect = this.$refs.button.childNodes[0].getBoundingClientRect();
            this.button.width = buttonRect.width;
            this.button.height = buttonRect.height;

            let contextRect = this.$refs.context.childNodes[0].getBoundingClientRect();
            this.context.width = contextRect.width;
            this.context.height = contextRect.height;
        },
    },
};
</script>
