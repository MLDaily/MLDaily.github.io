---
layout: main
mathjax: true
comments: true
title:  "MapReduce - Features"
date:   2015-11-3 12:32:21
categories: ml-algorithms
excerpt: The Hadoop Mapreduce comes packed with a number of features and utilities to help us around. Some of the key features are discussed here.
---


#Features of MapReduce

When huge datasets are under execution, it is hard to keep track of <strong>performance variables(status, progress, memory, speed to name a few)</strong>. The <i>Hadoop Mapreduce</i> comes packed with a number of features and utilities to help us around. Some of the key features of MapReduce include:

* Counters 

* Sorting  

* Joins 

* Side Data Distribution 

Let us explore each feature in detail.

##Counters

They act **pseudo checkpoints** for your program, with their values getting incremented when a certain event is triggered. Counters are counter-part of logs, but in numeric format. The counter values can be used to provide statistical information about the health of the node and, in turn about the progress of the job. Hadoop provides various build in counters, divided into groups. Each group either contains a task counter or a job counter.

<strong>Task Counters</strong> 

These are updated through the course of an individual task, each job is broken into a number of tasks and *each task has its own set of task counters*. The task counters (as the name suggests) periodically send their infomation to their parent task tracker. The task tracker then handshakes this information to the job tracker for aggretation. The information obtained from the task counters can be read while the job is running, using the JAVA APIs to retrieve the counter values. This keeps the user updated about the status of the tasks.

<strong> Example : File_Output_Counter</strong>: A type of FileOutputFormat counter; keeps track of the number of data bytes written by the mapper during intermediate storage of the mapped data in the local file system. The aggregate of which gives the total bytes written at the end of mapping.


<strong>Job Counters</strong> 

These are exclusively maintained by the job tracker. They are never communicated across the network. The job counters measure the job_level(global) changes.

<strong>Example : Data_Local_Maps and Rack_Local_Maps</strong> - They count the number of jobs that ran on the same node, and same rack respectively, as the input data.

In addition to the numerous build in counters, MapReduce has provision for custom counters as well. So the user can create a counter as per his need. By default the counters are of type *Java Enum*. The enum fields act as counter names, and are incremented as per desired event. But, the enum based counters come with a setback, they are not dynamic in nature. Java enum fields get initialized, and defined at compile time. So its fields (names and total number) cannot be modified on the go. To overcome this we can use the *Java String* objects whose value can be dynamically changed.
Thus, there are 2 ways of defining counters, either via enums or string. Even though most RPCs-Remote Procedure Calls (MapRed performs many) convert the enum fields to string, enums are more widely used for their ease of execution.

Next up we take up another feature of MapReduce. I shall be using the following dummy \<Key, Value\>

\<First_Name, Last_Name\>

\<Sam, Johan\>

\<Param,Bhatt\>

\<Sally, Browns\>
...
...
... and so on.

##Sorting

Sorting algorithms form the heart of MapReduce paradigm. Even if your dataset is not sort oriented, it can, and usually does, utilize the sorting ability of MapRed to sort things out!(faster).

<strong>Partial Sorting</strong>

By default, MapReduce sorts the input records by their keys. But, you can easily override the default sort order. In our exmaple, the dataset is sorted by the First_Name(alphabetically). The sorted result of a single MapReduce is not a problem if the datset is small, and only one reduce is run. Problem occurs in case of multiple reducers. The final output of each reducer is sorted, but when I simply write back the sorted data of each reducer into the output file, then the global output is not sorted.


	A     A
	B     B
	C     C 


when concatinated in a single file. (the output of a reducer is dumped all at once in chunks)


	A
	B
	C
	A
	B
	C


is a partially sorted output. The searching time in this file is comparable with linear search time (for huge datasets)
Thus, partial sorting might not useful in every scenario.

<strong>Total Sorting</strong> 

By now, you must have gussed what a total sort does. Yes! It presents a globally sorted data. How is that possible?
Quite possible if only one reducer is run(which by deafult partially sorts the whole data to give the total sort). But are we exploiting Hadoop through a single node? Another possible method is binning. We divide the data into partitions, where each set operates on a range of data. But to optimise the binnning width, we need to parse the whole data. A MapRed before an actual MapRed!
Or we can use a sample dataset. The build-in samplers provided by Mapred are:

* SplitSampler: Sample data contains only the first n values, obtained from the split at nth value.

* IntervalSampler:Sample data contains every nth value, where 1 \< n \< size_of_dataset

* RandomSampler: Picks datavalues randomly

The time taken to work on a sampled set is few seconds as compared to the whole dataset.

	A     A
	B     B
	C     C 

when concatinated in a single file:

	A
	A
	B
	B
	C
	C

is a totally sorted output.

<strong>Secondary Sorting</strong> 

The MapReduce sorts record by the key before it is passed to the reducer. However, for the same key, the values are not sorted. Infact, the MapReduce programs are written so that they are independent of the order of the values. This is because, values with same keys might end up in different partitions, or are written at different time. Users can still impose ordering on value as well. Here the whole \<key,value\> gets treated as a compsite \<KEY\> for the purpose of sorting. Sorting happens on the basics of the natural(original) key, but in case of duplicacy the natural value comes to the rescue.

<strong>Example :</strong> \<key, value\> = \<First_Name, Last_Name\>

By default only the First_Name is sorted. In case of matching First_Name, the Last_Name  are randomly ordered. By using \<First_Name, last name\> as a composite key \<Name\>, better results are obtained.

##Joins

Let us re-use the old dummy dataset of names. Along with this dataset, let us assume another, equally large dataset of \<First_Name, Age\>.

Now, suppose you wish to determine how many people with Last_Name starting with P, are aged 25. We have to combine the information from the two datasets, to be able to query it. This is where the concept of <strong>Joins</strong>(literally joining 2 or more datasets) comes into picture. Joining in MapReduce can be performed either by a Mapper, or by a Reducer. If the join is performed by the Mapper, it is called <strong>Map-Side Join</strong>. The join performed by the reducer is called the <strong>Reduce-Side Join.</strong>

**Map-Side Joins** 

The datasets used in the map-side joins must be divided into equal number of partitions, and each partition must be sorted using the same join key. In our case the First_Name. Map-side joins work best when the output files are not splittable(i.e they do not span more than a block).

Perfoming partial sort on individual files, using the same number of reducers, gives the combined output of map-side join on the data.

**Reduce-Side Joins**

A reduce side join is more generic in nature, and does not require sorted data to work upon. The mapper uses the join key as the map output key, and the records with same key are brought together in the same reducer. In our case, the output of both mappers are sorted by First_Name, then all \<key,value\> with same First_Name are brought together. The reducer combines the matching keys to create the composite dataset. Three features of MapReduce that aid in reduce-side joining are:

* Multiple Inputs
* Secondary Sorting
* Data Buffering
 
Lets briefly check upon these features.

####Multiple Inputs

Data that is streamed to the MapReduce can be of various types, various types of input files, and even with files with same extension, the delimiter can differ(i.e a .txt can have comma separated values, while another can have tab sperated values). Various files have to be interpreted by a single input mapper, and it will work on *SingleInput* format. To be able to support multiple formats the *MultipleInput* format is used. This takes care of the separte parsing for each kind of datasource.

####Secondary Sort

The reducer may receive the partially sorted data in any order. But, for the purpose of joining we need the data to be ordered. If we want the dataset to be of type \<Last_Name, Age\>, we have to ensure that the Names dataset gets to the reducer first, in all cases. Summing up, each instance of the reducer needs to follow the same pattern. Since the reducer knows the output form to be generated, and it already receives the partial outputs,the reducer uses them to filter out a part of the output.\<key,value\>

####Data Buffering
Another mechanism to have ordered data in the reducer is to use the buffers. The *data_join* packages which implements the reduce-side join uses data buffering to put together the out of order data. But the amount of memory available as buffer becomes a bottleneck. 

####Practical Implementation of Joins
 
Joins in Mapreduce are hardly written as a part of MapReduce program, for it can be very taxing. Developers instead, depend upon high level frameworks like <strong>Pig/Hive/Hbase</strong> to get their work done. These frameworks can be easily integrated with MapReduce, while providing easy of joining. We can use the SQL like query grammar instead of hard coding the joins. Also, like the SQL joins, joins in MapReduce can be either inner or outer. The type of join used, and its implementation depends upon the size of the datasets to be joined, with map-side joins prefered if atleast one of them is smaller in size.

##Side Data Distribution

**What is side data?**
	
<strong>Side data</strong> as the name suggests, is the extra data used along side with the main dataset, to aid in the processing of the main dataset. This side data needs to be present at every mapper and/or reducer node (which might need side data) in the most optimised manner (keeping in mind the load on the nodes and the network).

**Method 1- Using the JobConf(older verisions)/Configuration Objects**

One can easily override the *Configure()* methods of mapper or reducer. This will help store some data, that can be retrieved by the *getConfiguration()* methods. The information to be stored, is stored as instance of the JobConf object. But this method wastes a lot of time and memory, as each time the any configuration is read/changed, all the entries in the configuration are read, even if only one is to be used. 

**Method 2- Distributed Cache**

A better mechanism is to use the underlying HDFS's distributed cache mechanism, without worrying of its implement as Hadoop takes care of it. Using the <strong>-file,-archieves,-libjars</strong> switches, we copy specified files and JARs into the HDFS. During the job execution, the task tracker copies the files to its own disk(local cache). Now, the files are said to be *localised*. When ever the file is used the task-tracker loads the file into the desired program, and increments the counter by one. After the task is completed, the counter is decremented. Once the counter reaches zero, the file can be removed from the cache. The deafult cache size is <strong>10 GB</strong>. Once this is full to capacity, the cache replacements mechanism (works internally within Hadoop) is used, to bring in new files.

That sums up our discussion upon the four basics features of Mapreduce.

