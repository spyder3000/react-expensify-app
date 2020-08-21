import Enzyme from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
import DotEnv from 'dotenv'; 
DotEnv.config({ path: '.env.test' }); 
//require('dotenv').config({ path: '.env.test' });   // require here should also work in place of prev 2 lines

Enzyme.configure({
    adapter: new Adapter()
})