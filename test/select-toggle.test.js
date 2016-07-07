'use strict';

import React from 'react';
import { 
    shallow, 
    mount, 
    render 
} from 'enzyme';
import SwitchToggle from 'app/components/SwitchToggle/SwitchToggle';

const SIZE = {
    medium: 'medium',
    large: 'large',
    small: 'small'
}

let warningUtil = {
  watchConsole() {
    spyOn(console, 'warn');
  },
  propWarnings() {
    let propWarnings = console.warn.calls.all().filter((c) => {
      return (c.args &&
      c.args.length > 0 &&
      /(Invalid prop|Failed propType)/.test(c.args[0]));
    });
    return propWarnings;
  }
}

describe("switch toggle button", function() {
    beforeEach(warningUtil.watchConsole);

    it('render toggle button is instance of SwitchToggle', function(){
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const wrapper = mount(<SwitchToggle {...prop} />);
        expect(wrapper.instance() instanceof SwitchToggle).toBeTruthy();
    });

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
    it('render toggle button with html content', function(){
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };

        const wrapper = mount(<SwitchToggle {...prop} />);
        expect(wrapper.find('input').hasClass('cmn-toggle cmn-toggle-round-flat')).toEqual(true);
        expect(wrapper.find('label').html()).toEqual(
          `<label for="test-1"></label>`
        );
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
    it("check state checked when change status input", function(){
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
        expect(app.state('checked')).toEqual(true);
    });
    it("render button and get value checked", function(){
        const callback = jasmine.createSpy('changed');
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest',
            onChange: callback
        };
        const app = mount(<SwitchToggle {...prop} />);
        const input = app.find('input');
        expect(app.instance().getValue()).toEqual(false);
        input.simulate('change', {target: { checked: true }}); 
        expect(app.state('checked')).toEqual(true);
        expect(app.instance().getValue()).toEqual(true);
    });
    it("render button and and set default value != boolean", function(){
        const prop = {
            size: SIZE.medium,
            id: 'test-1',
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />); 
        expect(function(){
            app.instance().setValue('true')
        }).toThrow(new Error('setValue(): arg must be boolean.'));
    });
    it("render toggle button with invalid id props", function(){
        const prop = {
            size: SIZE.medium,
            id: 12,
            ref: 'switchTest'
        };
        mount(<SwitchToggle {...prop} />)
    });
    it("render toggle button with invalid onChange props", function(){
        const prop = {
            size: SIZE.medium,
            id: '12',
            ref: 'switchTest',
            onChange: 'onChange'
        };
        mount(<SwitchToggle {...prop} />)
    });
    it("render toggle button with invalid size props", function(){
        const prop = {
            size: 12,
            id: '12',
            ref: 'switchTest'
        };
        mount(<SwitchToggle {...prop} />)
    });
    it("render toggle button with invalid style props", function(){
        const prop = {
            size: '12',
            id: '12',
            ref: 'switchTest',
            style: 23
        };
        mount(<SwitchToggle {...prop} />)
    });
    it("render button and get default props size", function(){
        const prop = {
            id: 'test-1',
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />);
        expect(app.prop('size')).toEqual(SIZE.large);
    });
    it("render button and get default props style", function(){
        const prop = {
            ref: 'switchTest'
        };
        const app = mount(<SwitchToggle {...prop} />);
        expect(app.prop('style')).toEqual('style-1');
    });
    afterEach(() => {
        expect(warningUtil.propWarnings().length).toBe(0);
    });

    
});
