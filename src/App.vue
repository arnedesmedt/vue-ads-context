<template>
    <div id="app">
        <vue-ads-context
            class="vue-ads-absolute"
            style="left: 267px; top: 456px;"
            toggle-type="click"
            horizontal-position="right-right"
            vertical-position="top-bottom"
        >
            <span slot="item" class="vue-ads-bg-red">Button</span>
            <span slot="context" class="vue-ads-bg-blue">Context en nog zoveel meer</span>
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

<style>
    html,body {
        width: 100%;
        height: 100%;
    }
</style>
