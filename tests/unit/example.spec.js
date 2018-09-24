import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/Context.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg },
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
