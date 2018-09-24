<template>
    <div id="app">
        <vue-ads-context
            class="absolute"
            style="left: 267px; top: 456px;"
            horizontal-position="right-right"
            vertical-position="top-bottom"
            toggle-on-hover="true"
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
