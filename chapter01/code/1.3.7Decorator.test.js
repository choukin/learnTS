const rewire = require("rewire")
const _1_3_7Decorator = rewire("./1.3.7Decorator")
const IsInRole = _1_3_7Decorator.__get__("IsInRole")
const Role = _1_3_7Decorator.__get__("Role")
const ClassRole = _1_3_7Decorator.__get__("ClassRole")
const TestDecoratorExample = _1_3_7Decorator.__get__("TestDecoratorExample")
// @ponicode
describe("IsInRole", () => {
    test("0", () => {
        let callFunction = () => {
            IsInRole(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            IsInRole("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            IsInRole("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            IsInRole("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            IsInRole("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            IsInRole(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Role", () => {
    test("0", () => {
        let callFunction = () => {
            Role("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            Role("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            Role("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            Role(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            Role("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            Role(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("ClassRole", () => {
    test("0", () => {
        let callFunction = () => {
            ClassRole("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            ClassRole(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            ClassRole("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            ClassRole("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            ClassRole("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            ClassRole(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("TestDecoratorExample", () => {
    test("0", () => {
        let callFunction = () => {
            TestDecoratorExample("POST")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            TestDecoratorExample("DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            TestDecoratorExample(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
