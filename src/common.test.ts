import { returnRangeNumber,ifInRange,ifLessThanTenAddZero,strCode } from './common';

describe('returnRangeNumber', () => {
    test('should return max when now > max', () => {
        const min = 1,max=2,now=3;
        const res = returnRangeNumber(min,max,now);
        expect(res).toEqual(max);
    });
    test('should return min when now < min', () => {
        const min = 1,max=2,now=0;
        const res = returnRangeNumber(min,max,now);
        expect(res).toEqual(min);
    });
});

describe('ifInRange', () => {
    test('should return true when now > min && now < max', () => {
        const min = 1,max=999,now=50;
        const res = ifInRange(min,max,now);
        expect(res).toEqual(true);
    });
    test('should return false when now < min || now > max', () => {
        const min = 0,max=99,now=-1;
        const res = ifInRange(min,max,now);
        expect(res).toEqual(false);
    });
    test('should return false when max === now || min === now',()=>{
        const min = -1,max=-1,now=-1;
        const res = ifInRange(min,max,now);
        expect(res).toEqual(false);
    })
});

describe('ifLessThanTenAddZero',()=>{
    test('should return num when num >= 10',()=>{
        const num = 12;
        const res = ifLessThanTenAddZero(num);
        expect(res).toEqual('12');
    })
    test('should return num with zero when num < 10',()=>{
        const num = 0;
        const res = ifLessThanTenAddZero(num);
        expect(res).toEqual('00');
    })
})

describe('strCode',()=>{
    test('should return str.length when str is full of english',()=>{
        const str = 'jojo';
        const res = strCode(str);
        expect(res).toEqual(4);
    })
    test('should return 7 when str is jo哈jo and chineseStrByte = 3',()=>{
        const str = 'jo哈jo';
        const res = strCode(str);
        expect(res).toEqual(7);
    })
})

// TODO 不知道怎么测定时器
// describe('setCalTimer',()=>{
//     test('should return timer when')
// })


