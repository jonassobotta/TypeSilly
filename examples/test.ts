const myVariable = true;
const anotherVariable = 5;
const andAnotherVariable = "Hello";
const someNumberVariable = 5.5;
function greet() {
  console.log("Greetings!");
}

function add(a: number, b: number): number {
  return a + b;
}

greet();
add(anotherVariable, someNumberVariable);