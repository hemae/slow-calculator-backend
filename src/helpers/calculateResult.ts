import {Operation} from '../types'


type Options = {
    nums: number[]
    operation: Operation
}

export function calculateResult(options: Options): number {

    const {nums, operation} = options

    let result
    switch (operation) {
        case '+':
            result = nums.reduce((num, acc) => acc + num, 0)
            break
        case '-':
            result = nums.reduce((num, acc) => acc - num, 2 * nums[0])
            break
        case '*':
            result = nums.reduce((num, acc) => acc * num, 1)
            break
        case '/':
            result = nums.reduce((num, acc) => acc / num, nums[0] * nums[0])
            break
        default:
            result = 0
    }

    return result
}
