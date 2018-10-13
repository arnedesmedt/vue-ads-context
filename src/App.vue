<template>
    <div id="app">
        <vue-ads-context
            :toggle-on-hover="true"
            class="absolute"
            style="left: 267px; top: 456px;"
            horizontal-position="right-right"
            vertical-position="top-bottom"
        >
            <span slot="button">Button</span>
            <span slot="context">Context en nog zoveel meer</span>
        </vue-ads-context>
    </div>
</template>

<script>
import './assets/css/tailwind.css';

import VueAdsContext from './components/Context';

export default {
    name: 'App',
    components: {
        VueAdsContext,
    },
};
</script>
