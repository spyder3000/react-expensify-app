const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`; 

test('Add 2 Numbers', () => {   // 2 required args;  name & arrow function
    const result = add(3, 5); 
    expect(result).toBe(8); 
}); 

test('Generate Greeting from Name', () => {
    const result = generateGreeting('Oreo'); 
    expect(result).toBe('Hello Oreo!'); 
})
test('Generate Anonymous Greeting', () => {
    const result = generateGreeting(); 
    expect(result).toBe('Hello Anonymous!'); 
})