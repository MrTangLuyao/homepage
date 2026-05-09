LEARN.lesson('c-algo', 18, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead"><strong>队列</strong>是 FIFO（First In First Out，先进先出）的容器——一头进、另一头出。BFS、任务调度、生产者-消费者模型都是队列的天下。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">朴素数组实现的痛点</h3>
<p>用普通数组：enqueue 加在数组末尾 O(1)，但 dequeue 从队首取要把后面的全部前移 O(n)。<strong>这就是为什么需要循环数组（ring buffer）</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">循环数组（ring buffer）</h3>
<p>用两个索引 <code>front</code> 和 <code>rear</code>，到数组末尾就<strong>绕回 0</strong>：</p>
<pre><code>#define CAP 1024
typedef struct {
    int data[CAP];
    int front;   // 队首索引
    int rear;    // 下一个要入队的位置
    int size;    // 当前元素数（也用来区分空 vs 满）
} Queue;

void init(Queue *q)        { q-&gt;front = q-&gt;rear = q-&gt;size = 0; }
int  is_empty(Queue *q)    { return q-&gt;size == 0; }
int  is_full(Queue *q)     { return q-&gt;size == CAP; }

void enqueue(Queue *q, int v) {
    q-&gt;data[q-&gt;rear] = v;
    q-&gt;rear = (q-&gt;rear + 1) % CAP;     // 关键：取模实现"环"
    q-&gt;size++;
}

int dequeue(Queue *q) {
    int v = q-&gt;data[q-&gt;front];
    q-&gt;front = (q-&gt;front + 1) % CAP;
    q-&gt;size--;
    return v;
}</code></pre>
<p>"<strong>取模实现的环</strong>"是关键。enqueue 和 dequeue 都是 O(1)，没有挪动数组的代价。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么用 size 而不是 front == rear？</h3>
<p>front == rear 既可能是<strong>空</strong>也可能是<strong>满</strong>（队列绕了一圈回到起点）。多维护一个 size 就能消除这个歧义。</p>

@@intro:en
<p class="lead"><strong>Queue</strong> = FIFO (First In First Out) container — one end enters, the other exits. BFS, task scheduling, producer-consumer all live on queues.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Naive array problem</h3>
<p>Plain array: enqueue at end is O(1), but dequeue from front requires shifting everything left → O(n). <strong>That's why we need a circular array (ring buffer)</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Circular array (ring buffer)</h3>
<p>Two indices <code>front</code> and <code>rear</code> that <strong>wrap to 0</strong> at the end:</p>
<pre><code>#define CAP 1024
typedef struct {
    int data[CAP];
    int front;   // index of front
    int rear;    // index of next enqueue slot
    int size;    // current element count (also disambiguates empty vs full)
} Queue;

void init(Queue *q)        { q-&gt;front = q-&gt;rear = q-&gt;size = 0; }
int  is_empty(Queue *q)    { return q-&gt;size == 0; }
int  is_full(Queue *q)     { return q-&gt;size == CAP; }

void enqueue(Queue *q, int v) {
    q-&gt;data[q-&gt;rear] = v;
    q-&gt;rear = (q-&gt;rear + 1) % CAP;     // modulo = ring
    q-&gt;size++;
}

int dequeue(Queue *q) {
    int v = q-&gt;data[q-&gt;front];
    q-&gt;front = (q-&gt;front + 1) % CAP;
    q-&gt;size--;
    return v;
}</code></pre>
<p>"<strong>Modulo as ring</strong>" is the key. Both enqueue and dequeue are O(1), no shifting.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why size, not front == rear?</h3>
<p>front == rear can mean both <strong>empty</strong> AND <strong>full</strong> (queue wrapped fully around). A separate size disambiguates.</p>

@@task:zh
实现 init / is_empty / enqueue / dequeue。在主函数模拟一组操作并打印每个 dequeue 的结果（每行一个）：
<pre><code>enqueue 10
enqueue 20
enqueue 30
dequeue → 输出 10
enqueue 40
dequeue → 输出 20
dequeue → 输出 30
dequeue → 输出 40</code></pre>
按下面格式输出：
<pre><code>10
20
30
40</code></pre>

@@task:en
Implement init / is_empty / enqueue / dequeue. In main, simulate this sequence and print each dequeue result on its own line:
<pre><code>enqueue 10
enqueue 20
enqueue 30
dequeue → prints 10
enqueue 40
dequeue → prints 20
dequeue → prints 30
dequeue → prints 40</code></pre>
Output:
<pre><code>10
20
30
40</code></pre>

@@hint:zh
直接照模板写。注意 enqueue 之前最好检查 is_full，dequeue 之前检查 is_empty。
取模 <code>%</code> 让 rear 和 front 自动绕回 0。

@@hint:en
Follow the template directly. Check is_full before enqueue, is_empty before dequeue.
The modulo <code>%</code> auto-wraps rear and front back to 0.

@@starter
#include <stdio.h>

#define CAP 1024
typedef struct {
    int data[CAP];
    int front;
    int rear;
    int size;
} Queue;

void init(Queue *q)        { q->front = q->rear = q->size = 0; }
int  is_empty(Queue *q)    { return q->size == 0; }

void enqueue(Queue *q, int v) {
    // TODO
}

int dequeue(Queue *q) {
    // TODO
    return 0;
}

int main(void) {
    Queue q; init(&q);
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    printf("%d\\n", dequeue(&q));
    enqueue(&q, 40);
    printf("%d\\n", dequeue(&q));
    printf("%d\\n", dequeue(&q));
    printf("%d\\n", dequeue(&q));
    return 0;
}

@@answer
#include <stdio.h>

#define CAP 1024
typedef struct {
    int data[CAP];
    int front;
    int rear;
    int size;
} Queue;

void init(Queue *q)        { q->front = q->rear = q->size = 0; }
int  is_empty(Queue *q)    { return q->size == 0; }

void enqueue(Queue *q, int v) {
    q->data[q->rear] = v;
    q->rear = (q->rear + 1) % CAP;
    q->size++;
}

int dequeue(Queue *q) {
    int v = q->data[q->front];
    q->front = (q->front + 1) % CAP;
    q->size--;
    return v;
}

int main(void) {
    Queue q; init(&q);
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    printf("%d\\n", dequeue(&q));
    enqueue(&q, 40);
    printf("%d\\n", dequeue(&q));
    printf("%d\\n", dequeue(&q));
    printf("%d\\n", dequeue(&q));
    return 0;
}

@@expectedOutput
10
20
30
40
`);
