type Person = {
  name: string;
  age: number;
  address: string;
};

// Test case for Keys<T>
type PersonKeys = Keys<Person>; // Expected output: "name" | "age" | "address"

// Test case for Keys<T, P>
type PersonKeysExcludeAge = Keys<Person, "age">; // Expected output: "name" | "address"

// Test case for Signs<T>
type PersonSigns = Signs<Person>; // Expected output: never