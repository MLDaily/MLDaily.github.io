---
layout: main
mathjax: true
comments: true
title:  "MapReduce - A Clustering Approach"
date:   2015-10-22 3:00:36
categories: ml-algorithms
---

<script src="{{ "/js/math.min.js" | prepend: site.baseurl }}" type="text/javascript"></script>

##Cluster Architecture
<br>
Let's start with an example.

Let us say Google has to process about 10 billion pages everyday. The average size of a webpage may be about 20kb amounting to a whole <strong>200 TB</strong> for 10 billion pages. The data of each webpage has to be read from the CPU and the disk read bandwidth averages to about <strong>50 MB/sec</strong>. So, the time taken to read such amount of data by the Google servers would be about <strong>4 million seconds or 46+ days</strong>. So how does Google manage to do it in about 1-2 seconds ?


Now, the obvious thing you can think of is parallel processing of data. This data gets divided into chunks, and chunks are worked upon in parallel and data processing becomes faster cutting down a lot of time. So, if Google has about 1 million servers then it is able to process the faster cutting down the 4 million seconds into 4 seconds. This is the basic idea of <strong>Cluster Architecture</strong>.


Cluster computing itself comes with a number of challenges, like:
<ul >
	<li ><strong>Node Failures,</strong> which check the persistency of each of the nodes. Node failure is possible at any moment and failures during long process computations might cost a lot. In order to remove this, we store the same data on multiple nodes such that copies of the same data are available and computation does not need to stop.</li>
	<li ><strong>Network Bottleneck.</strong> This is a problem with the connection speeds among two nodes or switches. This speed is limited and moving loads of data might take a lot of time.</li>
	<li ><strong>Distributed Programming.</strong> Now distributed programming requires a lot of background knowledge and could be hard to implement. For this we make a simple programming model which hides the complexity underneath.</li>
</ul>


These challenges are solved by using a <strong>Distributed File System</strong>. A Distributed File System requires writing data once and reading it as many times as is required. Usually it consists of these three components :
<ul >
	<li ><strong>Chunk Servers</strong> serve as computational servers. A chunk is replicated about 2 to 3 times on different servers so as to avoid any loss of data. So, in a way, we are trying to move computation towards data for faster computation.</li>
	<li ><strong>The Master Node</strong> stores the metadata related to each server and assigns them tasks related to computation.</li>
	<li ><strong>Client Library</strong> keeps in contact with the master node to find the chunk server and connects directly to the chunk servers to access the data.</li>

<br>