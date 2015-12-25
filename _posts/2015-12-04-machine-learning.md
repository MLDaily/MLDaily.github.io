---
layout: main
mathjax: true
comments: true
title:  "Machine Learning"
date:   2015-12-04 18:14:08
categories: Introduction
excerpt: Let us see some basics of Machine Learning.
---

In the previous post, we learnt a simple algorithm and effective methods of using and applying this tool/algorithm in computer applications. Now we would like to take you on a tour of machine learning, keeping the simplest of concepts in mind and taking care of everything that we learn in the process. But before we move further, let us take a minute to understand what exactly machine learning is.

Think about this. How did you learn riding a bicycle the first time you attempted to do it. Let us view some of the basic steps:

1.	You viewed other people riding a cycle.

2.	If you were man enough, you attempted it yourself, but maybe failed the first time, hurting yourself in the process. You learned a specific way of not doing it.

3.	Again, if you were man enough, you did not give up, took the bicycle and tried again, and maybe failed again. You did not repeat the previous mistake, made a new one and again hurt yourself in the process. Again, you learnt another way not to ride the cycle.

4. This process continued untill you have learnt quite a number of ways how you should not be riding the bicycle and now can estimate the chances of success of the final proper method, if you attempt it.

5. Finally today, you may ride the cycle all day long and you will not get a scratch.

<strong>How did this happen ?</strong> <br>You learnt a number of correct tricks and methods which will lead you to riding the bicycle properly. But, even now when you are a pro in riding the cycle, you may go wrong at some place and hurt yourself again, but those can just be considered to be some bugs in the software.


<strong>How does machine learn ?</strong><br>
In order to simulate proper learning, machine must be able to learn in the same way the humans would. In the example above, we see that we learn from the simple technique of keeping the mistake in mind, and not repeating it. So, for the machine to learn, it must be able to keep the mistake in mind and "learn" simple techniques to counter the mistake for the next time. In next try, the machine might learn a new mistake, and again untill it has learnt all the mistakes possible to estimate the chances of success of the final proper method. And then, after some time, it might so happen, that the machine is riding the bicycle much better and faster than you are.

This was a simple example to demonstrate how a machine would learn, but we do not yet know what goes in and how the machine would store the information related to past experiences. Let us go through it step by step (for the same example of riding the bicycle):

1.	You viewed other people riding. A simple experience for you maybe, but the machine has to be given this input in the form of data, in order to be able to process it and keep its information intact in giving the machine a start in riding the bicycle and basic models of learning.

2.	First Attempt. Once, the machine gets the first set of data, it processes it with no previous knowledge of actually working on it (except see other people working on it). The machine may give it a random output, because it has no means of calculating the right output to this data. Even so, the data is only to make the machine learn, or store the output. So the first time, the machine tries to ride the cycle, with a random output its chances of riding it properly are close to none, and it fails, thus learning in the attempt that the output it presented in accordance with the data presented to it are not supposed to be together if it wants to properly ride the cycle.

3.	Second Attempt. Once again, the machine will get some data as input and again it will fail to properly process it in order to give it the proper output. This is due to the fact that machine has not yet learnt any method which will give the right output.

4.	This will go on for about thousand, maybe 10 thousand times. Then the machine has learnt a considerate number of ways to ride the bicycle and maybe then will it be able to give the right kind of output for the data presented to it.

5. Finally the machine is able to ride the bicycle properly.

<strong>What did just happen ?</strong><br>
The important part of what just happened above can be summed into three words <strong>remembering</strong>, <strong>adapting</strong> and <strong>generalising</strong>: recognising the last time we were in a situation like this (this data) we tried out some particular action (this output) and it worked (correct), so we will try it again, or it did not work (wrong) so we will try something different. The last part, generalising, is about recognising the similar situations, so that things learnt from one place may be applied in another. This is something that makes learning useful, because we can use our previously acquired knowledge in lots of different places and situations.

Of course, you can argue that there are many other parts of learning such as logical reasoning and deduction, but we would not worry about those. We are mostly interested in the most fundamental parts of intelligence - learning and adaption - and how they can be modelled in a machine. This was the basis of most early Artificial Intelligence, and is sometimes known as symbolic learning because the computer manipulates the symbols that reflect the environment. Machine Learning methods are called subsymbolic because no symbols or symbolic manipulation are involved.

Machine Learning, thus, is about making computers modify or adapt their actions so that these actions get more accurate, where accuracy is measured by how well the chosen actions reflect the correct ones.

