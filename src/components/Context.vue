<template>
    <span>
        <span
            ref="item"
            @click.stop="click"
            @mouseenter.stop="toggle"
            @mouseleave.stop="toggle"
        >
            <slot name="item" />
        </span>
        <span
            ref="context"
            @click.stop="clickContext"
            @mouseenter.stop="toggle"
            @mouseleave.stop="toggle"
            :class="contextClasses"
            :style="contextStyles"
        >
            <slot name="context" />
        </span>
    </span>
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
            item: {
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
                'vue-ads-absolute': true,
                'vue-ads-z-50': true,
            };
        },

        contextStyles () {
            let left = 0;
            let top = 0;

            if (this.horizontalPosition.startsWith('middle')) {
                left += this.item.width / 2;
            }

            if (this.horizontalPosition.startsWith('right')) {
                left += this.item.width;
            }

            if (this.horizontalPosition.endsWith('middle')) {
                left -= this.context.width / 2;
            }

            if (this.horizontalPosition.endsWith('right')) {
                left -= this.context.width;
            }

            if (this.verticalPosition.startsWith('middle')) {
                top += this.item.height / 2;
            }

            if (this.verticalPosition.startsWith('bottom')) {
                top += this.item.height;
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
            let itemRect = this.$refs.item.childNodes[0].getBoundingClientRect();
            this.item.width = itemRect.width;
            this.item.height = itemRect.height;

            let contextRect = this.$refs.context.childNodes[0].getBoundingClientRect();
            this.context.width = contextRect.width;
            this.context.height = contextRect.height;
        },
    },
};
</script>
