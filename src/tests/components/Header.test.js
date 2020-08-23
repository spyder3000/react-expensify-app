import React from 'react'; 
//import ReactShallowRenderer from 'react-test-renderer/shallow';   // shallow rendering -- just what's getting rendered (compare to DOM rendering)
import { shallow } from 'enzyme'; 
// import toJSON from 'enzyme-to-json';   // moved to jest.config.json
import { Header } from '../../components/header'; 

test('Should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />); 
    expect(wrapper).toMatchSnapshot();  // toJSON() extracts just the meaningful data from wrapper (the JSON) 

    // expect(wrapper.find('h1').length).toBe(1);   // checks for exactly 1 <h1> 
    //expect(wrapper.find('h1').text()).toBe('Expensify');   // .find() is similar to jQuery selector;  .text() returns text of element
    
    // ch 118 Snapshot Testing 
    // const renderer = new ReactShallowRenderer();   // create a new renderer
    // renderer.render(<Header />);        // render something to it
    // expect(renderer.getRenderOutput()).toMatchSnapshot();  // get rendered output & compare;  
    // console.log(renderer.getRenderOutput());   //  returns rendered output of JSX we put in;  
    
})

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();      // jest.fn() is a spy function
    const wrapper = shallow(<Header startLogout={startLogout} />); 
    wrapper.find('button').simulate('click');   
    expect(startLogout).toHaveBeenCalled();    
}); 
