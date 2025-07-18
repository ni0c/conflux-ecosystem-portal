// https://gist.github.com/tkrotoff/b0b1d39da340f5fc6c5e2a79a8b6cec0

// WTF!
// parseFloat('-0') => -0 vs parseFloat(-0) => 0
// -0 === 0 => true vs Object.is(-0, 0) => false
const minus0Hack = value => (Object.is(value, -0) ? "-0" : value)

export const operators = {
  "+": {
    func: (x, y) => `${minus0Hack(Number(x) + Number(y))}`,
    precedence: 1,
    associativity: "left",
    arity: 2
  },
  "-": {
    func: (x, y) => `${minus0Hack(Number(x) - Number(y))}`,
    precedence: 1,
    associativity: "left",
    arity: 2
  },
  "*": {
    func: (x, y) => `${minus0Hack(Number(x) * Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "/": {
    func: (x, y) => `${minus0Hack(Number(x) / Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "%": {
    func: (x, y) => `${minus0Hack(Number(x) % Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "^": {
    // Why Math.pow() instead of **?
    // -2 ** 2 => "SyntaxError: Unary operator used immediately before exponentiation expression..."
    // Math.pow(-2, 2) => -4
    // eslint-disable-next-line prefer-exponentiation-operator, no-restricted-properties
    func: (x, y) => `${minus0Hack(Math.pow(Number(x), Number(y)))}`,
    precedence: 3,
    associativity: "right",
    arity: 2
  }
}
export const operatorsKeys = Object.keys(operators)

export const functions = {
  min: {
    func: (x, y) => `${minus0Hack(Math.min(Number(x), Number(y)))}`,
    arity: 2
  },
  max: {
    func: (x, y) => `${minus0Hack(Math.max(Number(x), Number(y)))}`,
    arity: 2
  },
  sin: { func: x => `${minus0Hack(Math.sin(Number(x)))}`, arity: 1 },
  cos: { func: x => `${minus0Hack(Math.cos(Number(x)))}`, arity: 1 },
  tan: { func: x => `${minus0Hack(Math.tan(Number(x)))}`, arity: 1 },
  log: { func: x => `${Math.log(Number(x))}`, arity: 1 } // No need for -0 hack
}
export const functionsKeys = Object.keys(functions)

const top = stack => stack[stack.length - 1]

/**
 * Shunting yard algorithm: converts infix expression to postfix expression (reverse Polish notation)
 *
 * Example: ['1', '+', '2'] => ['1', '2', '+']
 *
 * https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 * https://github.com/poteat/shunting-yard-typescript
 * https://blog.kallisti.net.nz/2008/02/extension-to-the-shunting-yard-algorithm-to-allow-variable-numbers-of-arguments-to-functions/
 */
export function shuntingYard(tokens) {
  const output = new Array()
  const operatorStack = new Array()

  for (const token of tokens) {
    if (functions[token] !== undefined) {
      operatorStack.push(token)
    } else if (token === ",") {
      while (operatorStack.length > 0 && top(operatorStack) !== "(") {
        output.push(operatorStack.pop())
      }
      if (operatorStack.length === 0) {
        throw new Error("Misplaced ','")
      }
    } else if (operators[token] !== undefined) {
      const o1 = token
      while (
        operatorStack.length > 0 &&
        top(operatorStack) !== undefined &&
        top(operatorStack) !== "(" &&
        (operators[top(operatorStack)].precedence > operators[o1].precedence ||
          (operators[o1].precedence ===
            operators[top(operatorStack)].precedence &&
            operators[o1].associativity === "left"))
      ) {
        output.push(operatorStack.pop()) // o2
      }
      operatorStack.push(o1)
    } else if (token === "(") {
      operatorStack.push(token)
    } else if (token === ")") {
      while (operatorStack.length > 0 && top(operatorStack) !== "(") {
        output.push(operatorStack.pop())
      }
      if (operatorStack.length > 0 && top(operatorStack) === "(") {
        operatorStack.pop()
      } else {
        throw new Error("Parentheses mismatch")
      }
      if (functions[top(operatorStack)] !== undefined) {
        output.push(operatorStack.pop())
      }
    } else {
      output.push(token)
    }
  }

  // Remaining items
  while (operatorStack.length > 0) {
    const operator = top(operatorStack)
    if (operator === "(") {
      throw new Error("Parentheses mismatch")
    } else {
      output.push(operatorStack.pop())
    }
  }

  return output
}

/**
 * Evaluates reverse Polish notation (RPN) (postfix expression).
 *
 * Example: ['1', '2', '+'] => 3
 *
 * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 * https://github.com/poteat/shunting-yard-typescript
 */
export function evalReversePolishNotation(tokens) {
  const stack = new Array()

  const ops = { ...operators, ...functions }

  for (const token of tokens) {
    const op = ops[token]

    // eslint-disable-next-line unicorn/no-negated-condition
    if (op !== undefined) {
      const parameters = []
      for (let i = 0; i < op.arity; i++) {
        parameters.push(stack.pop())
      }
      stack.push(op.func(...parameters.reverse()))
    } else {
      stack.push(token)
    }
  }

  if (stack.length > 1) {
    throw new Error("Insufficient operators")
  }

  return Number(stack[0])
}

/**
 * Breaks a mathematical expression into tokens.
 *
 * Example: "1 + 2" => [1, '+', 2]
 *
 * https://gist.github.com/tchayen/44c28e8d4230b3b05e9f
 */
export function tokenize(expression) {
  // "1  +" => "1 +"
  const expr = expression.replace(/\s+/g, " ")

  const tokens = []

  let acc = ""
  let currentNumber = ""

  for (let i = 0; i < expr.length; i++) {
    const c = expr.charAt(i)
    const prev_c = expr.charAt(i - 1) // '' if index out of range
    const next_c = expr.charAt(i + 1) // '' if index out of range

    const lastToken = top(tokens)

    const numberParsingStarted = currentNumber !== ""

    if (
      // 1
      /\d/.test(c) ||
      // Unary operator: +1 or -1
      ((c === "+" || c === "-") &&
        !numberParsingStarted &&
        (lastToken === undefined ||
          lastToken === "," ||
          lastToken === "(" ||
          operatorsKeys.includes(lastToken)) &&
        /\d/.test(next_c))
    ) {
      currentNumber += c
    } else if (c === ".") {
      if (numberParsingStarted && currentNumber.includes(".")) {
        throw new Error(`Double '.' in number: '${currentNumber}${c}'`)
      } else {
        currentNumber += c
      }
    } else if (c === " ") {
      if (/\d/.test(prev_c) && /\d/.test(next_c)) {
        throw new Error(`Space in number: '${currentNumber}${c}${next_c}'`)
      }
    } else if (functionsKeys.includes(acc + c)) {
      acc += c
      if (!functionsKeys.includes(acc + next_c)) {
        tokens.push(acc)
        acc = ""
      }
    } else if (
      operatorsKeys.includes(c) ||
      c === "(" ||
      c === ")" ||
      c === ","
    ) {
      if (
        operatorsKeys.includes(c) &&
        !numberParsingStarted &&
        operatorsKeys.includes(lastToken)
      ) {
        throw new Error(`Consecutive operators: '${lastToken}${c}'`)
      }
      if (numberParsingStarted) {
        tokens.push(currentNumber)
      }
      tokens.push(c)
      currentNumber = ""
    } else {
      acc += c
    }
  }

  if (acc !== "") {
    throw new Error(`Invalid characters: '${acc}'`)
  }

  // Add last number to the tokens
  if (currentNumber !== "") {
    tokens.push(currentNumber)
  }

  // ['+', '1'] => ['0', '+', '1']
  // ['-', '1'] => ['0', '-', '1']
  if (tokens[0] === "+" || tokens[0] === "-") {
    tokens.unshift("0")
  }

  return tokens
}

export function calc(expression) {
  const tokens = tokenize(expression)
  const rpn = shuntingYard(tokens)
  return evalReversePolishNotation(rpn)
}
