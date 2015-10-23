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
Modern data-mining application, often called “big-data” analysis, demands quick processing over huge volume of data. In most of these applications, the data is extremely regular, offering an opportunity to exploit parallelism. Let's see an example.

Google has to process about 6 billion pages everyday(4 million queries per minute!). The average size of a webpage is around 20kb, amounting to <strong>120 TB</strong> for 6 billion pages. The data of each webpage has to be read from the memory via  CPU. When the disk read bandwidth averages to <strong>50 MB/sec</strong>, the query time of Google servers should be <strong>2.4 million seconds or 27+ days</strong>. But Google manages this within 1-2 seconds. How ?
>"When the load on your ox increases, and you cannot increase the strength of that ox beyond a limit, then you must increase the number of oxen employed for the task" -Grace Hopper's analogy for parallel processing.

This is exactly what Google did, and it forms the underlying principal of <strong>Cluster Architecture</strong>.

Most computation is done on a single processor, using its main memory, cache, and local disk (comput node). The <strong>compute nodes</strong> are commodity hardware. 10x cheaper than special-purpose parallel machines. The new parallel-computing architecture, sometimes called cluster computing, is organized as follows. Independent compute nodes are stored on racks, perhaps 8–64 on a rack. The nodes on a single rack are connected by a network, typically gigabit Ethernet. There are many racks within a data center, and racks are inter connected by another level of network or a switch. The bandwidth of inter-rack communication is just slightly higher than the intrarack Ethernet, but given the number of pairs of nodes that might need to communicate between racks, this difference is considerable. The figure below suggests the architecture of a large-scale computing system. However, there may be many more racks and many more compute nodes per rack.

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



Cluster computing comes with its own set of challenges. Some of them being:
<ul >
	<li ><strong>Node Failure-</strong>A scenario highly possible, and computationaly taxing. In order to prevent loss of data, we store the same data on multiple nodes. So that the redundant data is always available for compuatation.</li>
	<li ><strong>Network Speed-</strong>Nodes are continuously transfering information(in huge amounts) among themselves. Thus, limited network speed can become a bottleneck as it uncessarliy adds to the overall quering time.</li>
	<li ><strong>Distributed Programming Paradigm-</strong>Writing highly optimised and accurate distributed alogirthms is tough. For it not only requires you to be an expert programmer, but to also have extensive knowledge about the underlying system.</li>
</ul>


These challenges have been effectiveky answered by the  <strong>Distributed File System(DFS)</strong>. DFS requires writing data once, and then reading it as and when required. Three main components of the DFS include:
<ul >
	<li ><strong>Chunk Servers-</strong> They act as computational servers. A chunk(a block of data) is replicated about 2 to 3 times on different servers so as to provide persistancy in the face of failure. In addition these nodes carry out the computation that is requested by the user. Instead of sending the data(larger in size) to user, we bring the user query(smaller in size)to the data.</li>
	<li ><strong>The Master Node-</strong>A node that stores the metadata related to each server, and assigns them tasks. It is the master node responsible for overall health of the DFS</li>
	<li ><strong>Client Libraries-</strong>A set APIs that contact with the master node to find the desired chunk server, and then connect directly to the chunk servers for read/write operations.</li>
</ul>

<br>

<!-- ##MapReduce
<br>

The MapReduce algorithm is mostly used in order to either reduce the size of our data, which may be enormous, or to make data access simpler. It helps in performing most common calculations on large-scale data to be performed on computing clusters efficiently and in a way that is tolerant of hardware failures during the computation. -->
