---
title: 排序算法总结
date: 2019-07-05 14:00:00
tags: 
- Algorithm
---
本文对常见的排序算法和它们的空间、时间复杂度进行总结
<!-- more -->


| 排序算法 |平均时间复杂度 | 最好时间复杂度 |  最坏时间复杂度 | 空间复杂度 | 稳定性 |
| :------|:------| :------: | :------|:------| :------: |
| 插入排序 | O(n^2) | O(n) | O(n^2) | O(1) | Yes|
| 冒泡排序 | O(n^2) | O(n^2) | O(n^2) | O(1) | Yes|
| 选择排序 | O(n^2) | O(n^2) | O(n^2) | O(1) | No |
| 希尔排序 | O(n^1.5) | O(n^1.5) | O(n^2) | O(1) | No |
| 归并排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(n) | Yes |
| 堆排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(1) | No |
| 快速排序 | O(nlogn) | O(nlogn) | O(n^2)  | O(logn) | No |
| 计数排序 | O(n+m) | O(n+m) | O(n+m)  | O(n+m) | Yes |
| 桶排序   | O(n) | O(n) | O(n)  | O(m) | Yes |
| 计数排序 | O(n*k) | O(n*k) | O(n^2)  | ? | Yes |

其中k代表数值中“数字”的个数，n代表数据规模，m代表数据的最大值减去最小值

#### 1. 插入排序
插入排序将数组分为有序和无序两部分，每次从无序部分取出一个数字，将其与前面已经排好序的子序列进行比较，并插到有序子序列中的正确位置。
```
const insertSort = arr => {
    for(let i = 1; i< arr.length; i++) {
        let temp = arr[i];
        for(let j = i; j > 0 && temp < arr[j-1]; j--) {
            arr[j] = arr[j-1];
        }
        arr[j] = temp;
    } 
    return arr;
}
```

#### 2. 冒泡排序
冒泡排序包括一个简单的双重for循环。第一次内部for循环从记录数组的底部比较到顶部，比较相邻的关键码。如果低序号的关键码比高序号的关键码大，就交换两者的顺序。一旦遇到一个最小的关键码值，这个过程使它像“气泡”一样被推到数组的顶部。第二次再重复调用上面的过程，但是，既然知道最小元素在第一次就被推到了数组的最上面，因此就没有再比较最上面两个元素的必要了。同理，每轮循环都比上一轮循环少比较一个关键码。

```
const bubbleSort = arr => {
    for(let i = 0; i < arr.length-1; i++) {
        for(let j = arr.length-1; j>i; j--) {
            if(arr[j] < arr [j-1]){
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            }
        }
    }
    return arr;
}
```

#### 3. 选择排序
选择排序的第i次是选择第i小的记录，并把它放到第i小的位置上。换句话说，选择排序首先在未排序的序列中找到最小关键值，接着找到次小关键码值，以此类推。选择排序的独特之处在于交换操作很少。
```
const selectionSort = arr => {
    for(let i = 0; i < arr.length -1; i++) {
        let lowIndex = i;
        for(let j = arr.length - 1; j > i; j--) {
            if(arr[j] < arr[lowIndex]) {
                lowIndex = j;
            }
        }
        [arr[i], arr[lowIndex]] = [arr[lowIndex], arr[i]]
    }
    return arr;
}
```
以上三种算法都比较慢，关键瓶颈在于只比较相邻元素，因此，比较和移动只能一步步进行（除选择排序外）。有时也称这三种排序为**交换排序**。

#### 4. 希尔排序
shell排序也叫缩小增量排序，核心思想就是分组,其试图将待排序序列变成基本有序的，再利用插入排序来完成最后的排序工作。
```
const shellSort = arr => {
    var len = arr.length, gap = 1, temp;
    while (gap<len/3) {
        gap = gap*3 + 1;
    }
    for(gap; gap > 0 ; gap = Math.floor(gap/3)) {
        for(let i = gap; i< len; i++) {
            temp = arr[i];
            let j;
            for(j = i; j >= gap && arr[j-gap] > temp; j-=gap) {
                arr[j] = arr[j-gap];
            }
            arr[j] = temp;
        }
    }
    return arr;
}
```
#### 5. 快速排序
快速排序采用的是**分治法**策略：
1. 首先选择一个轴值（pivot）（在概念上这与BST的根节点值类似）。
2. 把比轴值小的结点（假设数目为k）放到数组左边的k个位置上，而大于轴值的节点被放在数组右边的n-k-1个位置上，这称为数组的一个划分。轴值的最终位置就是下标k。
3. 再对左右子数组重复以上操作

```
const quickSort = arr => {
    if(arr.length <= 1) {
        return arr;
    }
    const pivotIndex = Math.floor(arr.length/2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for(let item of arr) {
        item > pivot ? right.push(item) : left.push(item);
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
```
#### 6. 归并排序
归并排序采用分治策略，体现在把待排序的列表分成片段，先处理各个片段，再通过某种方式把片段重组：
1. 申请空间，用来存放合并后的序列
2. 设置两个指针，最初位置分别为两个已经排序序列的起始位置
3. 比较两个指针所指向的元素，选择相对小的元素放入合并空间，并移动指针到下一位置
4. 重复步骤三直至某一指针到达序列尾
5. 将另一未完序列的剩下元素直接复制到合并序列尾

```
const merge = (left, right) => {
    let result = [];
    while(left.length && right.length) {
        left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
    }
    return result.concat(left, right);
}
const mergeSort = arr => {
    if(arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
```

#### 7. 堆排序
堆排序是指利用二叉堆这种数据结构所设计的排序算法。堆由两条性质来定义： 首先，它是一棵**完全二叉树**，所以能够用数组来表示和实现；其次，堆中存储的数据是局部有序的。对于最大堆来说，任意一个节点存储的值都大于或者等于其任意子节点存储的值，所以根节点存储着该树所有节点的最大值。最小堆的定义类似。但是无论是最大堆还是最小堆，任意节点与其兄弟节点都没有必然关系。堆排序的算法步骤如下：
1. 把无序数列构建成二叉堆
2. 循环摘取堆顶元素，替换到二叉堆的末尾，调整产生新的堆顶
3. 直至堆为空
```
const adjustHeap = (arr, pos, length) => {
    let temp = arr[pos];
    let child = pos*2 + 1;
    while(child < length) {
        if(child+1<length && arr[child] < arr[child+1]){
            child++;
        }
        if(arr[child]>temp) {
            arr[pos] = arr[child];
            pos = child;
            child = 2*child+1;
        }else {
            break;
        }

    }
    arr[pos] = temp;
}
const heapSort = arr => {
    for(let i = Math.floor(arr.length/2); i > =0; i--) {
        adjustHeap(arr, i, arr.length);
    }
    for(let i = arr.length - 1; i > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        adjustHeap(arr, 0, i);
    }
    return arr;
}
```
