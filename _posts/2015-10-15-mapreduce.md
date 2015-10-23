---
layout: main
mathjax: true
comments: true
title:  "MapReduce - A Clustering Approach"
date:   2015-10-15 8:36:21
categories: ml-algorithms
---

<style type="text/css">
	.rack{
		padding:20px;
		border:1px solid lightgray;
		border-radius: 5px;
		margin: 20px 0px;
		text-align: center;
		height:400px;
	}
	.switch{
		max-height: 50px;
		max-width: 100px;
		padding:10px;
		border:1px solid lightgray;
		border-radius: 5px;
		margin: 0 auto;
	}
	.connectors{
		min-height: 50px;
		margin: 0px;
	}
	.connectors li{
		display: inline-block;
	}
	.connector1{
	  	position:absolute;
		border-top:1px solid black;
		width:190px;
		transform: rotate(165deg);
		transform-origin: -1%;
	}
	.connector2{	  
	  	position:absolute;
		border-top:1px solid black;
		width:70px;
		transform: rotate(135deg);
		transform-origin: -1%;
	}
	.connector4{
	  	position:absolute;
		border-top:1px solid black;
		width:190px;
		transform: rotate(15deg);
		transform-origin: -1%;
	}
	.connector3{	  
	  	position:absolute;
		border-top:1px solid black;
		width:70px;
		transform: rotate(45deg);
		transform-origin: -1%;
	}
	.racks{
		min-height: 250px;
		margin: auto;
	}
	.racks li{
		height: 200px;
		width:100px;
		margin: 0px 20px 0px 20px;
		display:inline-block;
		border: 1px solid lightgray;
	}
	.label{
		vertical-align: bottom;
		color: black;
		font-size: 15px;
	}
	.srack{
		height:20%;
		border-bottom: 1px solid lightgray;
	}

</style>


<script src="{{ "/js/math.min.js" | prepend: site.baseurl }}" type="text/javascript"></script>

##Cluster Architecture
<br>
Modern data-mining applications, often called “big-data” analysis, require us to manage immense amounts of data quickly. In many of these applications, the data is extremely regular, and there is ample opportunity to exploit parallelism. Let's consider an example.

Let us say Google has to process about 10 billion pages everyday. The average size of a webpage may be about 20kb amounting to a whole <strong>200 TB</strong> for 10 billion pages. The data of each webpage has to be read from the CPU and the disk read bandwidth averages to about <strong>50 MB/sec</strong>. So, the time taken to read such amount of data by the Google servers would be about <strong>4 million seconds or 46+ days</strong>. So how does Google manage to do it in about 1-2 seconds ?


Now, the obvious thing you can think of is parallel processing of data. This data gets divided into chunks, and chunks are worked upon in parallel and data processing becomes faster cutting down a lot of time. So, if Google has about 1 million servers then it is able to process the faster cutting down the 4 million seconds into 4 seconds. This is the basic idea of <strong>Cluster Architecture</strong>.

Most computing is done on a single processor, with its main memory, cache, and local disk (comput node). The <strong>compute nodes</strong> are commodity hardware, which greatly reduces the cost compared with special-purpose parallel machines. The new parallel-computing architecture, sometimes called cluster computing, is organized as follows. Compute nodes are stored on racks, perhaps 8–64 on a rack. The nodes on a single rack are connected by a network, typically gigabit Ethernet. There can be many racks of compute nodes, and racks are connected by another level of network or a switch. The bandwidth of inter-rack communication is somewhat greater than the intrarack Ethernet, but given the number of pairs of nodes that might need to communicate between racks, this bandwidth may be essential. Figure below suggests the architecture of a large-scale computing system. However, there may be many more racks and many more compute nodes per rack.

<div class="rack">
	<div class='switch'>SWITCH</div>
	<ul class="connectors">
		<li class="connector1"></li>
		<li class="connector2"></li>
		<li class="connector3"></li>
		<li class="connector4"></li>
	</ul>
	<ul class="racks">
		<li><div class="srack"></div><div class="srack"></div><div class="srack"></div><div class="srack"></div></li>
		<li><div class="srack"></div><div class="srack"></div><div class="srack"></div><div class="srack"></div></li>
		<li><div class="srack"></div><div class="srack"></div><div class="srack"></div><div class="srack"></div></li>
		<li><div class="srack"></div><div class="srack"></div><div class="srack"></div><div class="srack"></div></li>
	</ul>
	<div class="label">Physical Organization Of Compute Nodes</div>
</div>



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
</ul>

<br>

<!-- ##MapReduce
<br>

The MapReduce algorithm is mostly used in order to either reduce the size of our data, which may be enormous, or to make data access simpler. It helps in performing most common calculations on large-scale data to be performed on computing clusters efficiently and in a way that is tolerant of hardware failures during the computation. -->