/**
 * @description test demo
 * @author 夜枫林
 */

function sum(a, b) {
    return a + b
}

test(' 10 + 20 应该等于三十', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})




