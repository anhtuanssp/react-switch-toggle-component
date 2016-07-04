import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SwitchToggle from 'app/components/SwitchToggle/SwitchToggle';

const SIZE = {
    medium: 'medium',
    large: 'large',
    small: 'small'
}

describe("switch toggle button", function() {
    it("render toggle button with label has 'for' attribute", function() {
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const wrapper = shallow(<SwitchToggle {...prop} />);
        expect(wrapper.contains(<label htmlFor="test-1" />)).toEqual(true);
    });
    it("render toggle button with div wrapper", function() {
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const wrapper = shallow(<SwitchToggle {...prop} />);
        expect(wrapper.find('div').length).toEqual(1);
    });
    it("render toggle button with input type checkbox", function() {
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const wrapper = shallow(<SwitchToggle {...prop} />);
        expect(wrapper.find({type: 'checkbox'}).length).toEqual(1);
    });
    it("render toggle button with medium size", function() {
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />);
        const wrapper = shallow(<SwitchToggle {...prop} />);
        const label = app.find('label');
        const input = app.find('input');
        expect(label.length).toEqual(1);
        expect(input.length).toEqual(1);
        expect(app.prop('size')).toEqual(SIZE.medium);
        expect(app.prop('id')).toEqual(prop.id);
        
        expect(wrapper.hasClass('switch style-1 medium')).toEqual(true);
    });
    it("render toggle button with small size", function() {
        const prop = {
            size: SIZE.small,
            id: 'test-1',
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />);
        const wrapper = shallow(<SwitchToggle {...prop} />);
        const label = app.find('label');
        const input = app.find('input');
        expect(label.length).toEqual(1);
        expect(input.length).toEqual(1);
        expect(app.prop('size')).toEqual(SIZE.small);
        expect(app.prop('id')).toEqual(prop.id);
        expect(app.instance().getValue()).toEqual(false);
        expect(wrapper.hasClass('switch style-1 small')).toEqual(true);
    });
    it("render toggle button with large size", function() {
        const prop = {
            size: SIZE.large,
            id: 'test-1',
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />);
        const wrapper = shallow(<SwitchToggle {...prop} />);
        const label = app.find('label');
        const input = app.find('input');
        expect(label.length).toEqual(1);
        expect(input.length).toEqual(1);
        expect(app.prop('size')).toEqual(SIZE.large);
        expect(app.prop('id')).toEqual(prop.id);
        expect(app.instance().getValue()).toEqual(false);
        expect(wrapper.hasClass('switch style-1 large')).toEqual(true);
    });
    it("render toggle button with onChange prop", function(){
        const callback = jasmine.createSpy('changed');
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest',
            onChange: callback
        };
        const app = mount(<SwitchToggle {...prop} />);
        const input = app.find('input');
        input.simulate('change', {target: { checked: true }}); 
        expect(callback).toHaveBeenCalled();
    })
    
});
