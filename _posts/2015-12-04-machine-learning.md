---
layout: main
mathjax: true
comments: true
title:  "Machine Learning"
date:   2015-12-04 18:14:08
categories: Introduction
excerpt: Let us see some basics of Machine Learning.
---

In the previous post, we learned about a simple and effective algorithm. Now we would like to take you on a tour of machine learning. But before we move any further, let us take a minute to understand what exactly machine learning is.

Talk about learning. How does one learn to ride a bicycle?

1. View others ride.

2. Make the first attempt, get hurt, but atleast learn a particular method of how *NOT* to ride.  

3. This process of attempting, and hurting oneself continues, with an effort not to repeat the previous mistakes. 

4. By the end of this experience, one learns a number of ways of how not to ride, using which one can estimate the chances of success of the final proper method when attempted.

<strong>How does the machine learn ?</strong><br>
In order to simulate proper learning, machine must be able to learn the same way the humans would. In the above example, we see that one learns simply by keeping the mistakes in mind, and not repeating them. So, for the machine to learn, it must be able to keep the mistakes in its mind, and "learn" to counter them in future. The machine keeps learning until it has learnt all the mistakes possible to estimate the chances of success of the final method. It might also happen, that the machine learns to ride the bicycle much better and faster than humans.

This was a simple example to demonstrate how a machine can learn, but how does the machine store the information relating to past experiences?

Let us go through it step by step (for the same example of riding the bicycle):

1. Viewing others ride- A simple experience for you, but the machine has to be given this input in the form of data, to build the basic brute force learning model.

2. The First Few Attempts- Once, the machine gets the first set of data, it processes the data with no previous knowledge of actually working on it. At this point it givesn a junk output, using which it tries to find error in the model and improve the model. After the second attempt, the machine, detects an other error in the model (by comparing its output with the standard result) and again imporves the model.

4. This process continues, and the machine keeps improving its technique(as exhaustively as possible), until it is able to give the right output for the data presented to it.

5. Finally the machine is able to ride the bicycle properly.

<strong>What did just happen ?</strong><br>
The crux of what happened in the above process, can be summed in three words <strong>remembering</strong>, <strong>adapting</strong> and <strong>generalising</strong>. Recognising  the current situation in light of past experiences, and immitating the actions that were previous taken to tackle the situation. If an unknown situation arises, then we so we will try something different. The last part, generalising, is about recognising the similar situations, so that things learnt from one place may be applied in another. This makes learning easier and more useful.

Learning and adaption, and how they can be modelled in a machine formed the basis of early Artificial Intelligence, and is sometimes known as symbolic learning because the computer manipulates the symbols that reflect the environment. On the other hand, Machine Learning methods are called subsymbolic because no symbols or symbolic manipulation are involved.

Machine Learning, thus, is about making computers modify or adapt their actions so that these actions get more accurate over time; accuracy is measured by how well the chosen actions reflect the correct ones.