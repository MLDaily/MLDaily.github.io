#FEATURES OF MAPREDUCE
<br>

When huge datasets are under execution, it is hard to keep track of <strong>performance variables(status, progress, memory, speed to name a few)</strong>. The <i>Hadoop Mapreduce</i> comes packed with a number of features and utilities to help us around. Some of the key features of MapReduce include:
* Counters 
* Sorting  
* Joins 
* Side Data Distribution 

In this blog post, we shall be covering the counters and sorting in detail.
<br>
##Counters

They act **pseudo checkpoints** for your program, with their values getting incremented when a certain event is triggred. Counter are counter-part of logs, but in numeric format. The counter values can be used to provide statistical information about the health of the node and, in turn about the progress of the job. Hadoop provides various build in counters, divided in groups. Each group either contains atleast a task counter or a job counter.

<strong>Task Counters</strong> 
These are updated through the course of an individual task, each job is broken into a number of tasks and *each task has its own set of task counters*. The task counters (as the name suggests) periodically send their infomation to their parent task tracker. The task tracker then handshakes this information to the job tracker for aggretation. The information obtained from the task counters can be read while the job is running, using the JAVA APIs to retirve the counter values. This keeps the user updated about the status of the tasks.

<strong> EG: FILE_OUTPUT COUNTER</strong>: A type of FileOUtputFormat counter; keeps track of number of data bytes wriiten by mapper during intermediate storage of mapped data in the local file system. The aggregate of which gives the total bytes written at the end of mapping.


<strong>Job Counters</strong> 
These are execusively maintained by the job tracker. They are never communicated across the network. The job counters measure the job_level(global) changes.

<strong>Eg: Data_Local_Maps and Rack_Local_Maps</strong> - They count the number of jobs that ran on the node and same rack respectively, as the input data.

In addition to the numerous build in counters, MapReduce has provision for custom counters as well. So the user can create counters as per his need. By default the counter are of *Java Enum* type. The enum fields act as counter names, and are incremented as per desired event. But the enum based counters come with a setback, they are not dynamic in nature. Java enum fields get initialized, and defined at compile time. So its fields (names and total number) cannot be modified on the go. To overcome this we can use the *Java String* objects whose value can be dynamically changed.
Thus, there are 2 ways of defining counters, either via enums or string. Even though most RPC calls (MapRed performs many) convert the enum fields to string, enums are more widely used for their easy of execution.

Next up we take up another feature of MapReduce. Throughout the discussion I will use the following dummpy \<Key, Value\>

\<First_Name, Last_Name\>

\<Sam, Johan\>

\<Param,Bhatt\>

\<Sally, Browns\>
...
...
... and so on.

##Sorting

Sorting algorithms form the heart of MapReduce paradigm. Even if your dataset is not sort oriented, it can, and usually does, utilize the sorting ability of mapred to sort out things!(faster).

<strong>Partial Sorting</strong>

By default, MapReduce sorts the input records by their keys. But, you can easily override the default sort order. In our exmaple, the dataset is sorted by the First_Name(alphabetically). The sorted result of a single MapReduce is not a problem if the datset is small, and only one reduce is run. Problem occurs in case of multiple reducers. The final output of each reducer is sorted, but when I simply write back the sorted data of each reducer into the output file, then the global output is not sorted.
```
	A     A
	B     B
	C     C 
```
when concatinated in a single file. (the output of a reducer is dumped all at once in chunks)
```
	A
	B
	C
	A
	B
	C
```
is a partially sorted output. The searching time in this file is comparable with linear search time (for huge datasets)
Thus, partial sorting might not useful in every scenario.

<strong>Total Sorting</strong> 

By now, you would ahve gussed what a total sort does. Yes! it presents a globally sorted data. How is that possible?
Quite possible if only one reducer is run(which by deafult partially sorts the whole data to give the total sort). But are we exploiting Hadoop through a single node? Another possible method is binning. We divide the data into partitions, where each set operates on a range of data. But to optimise the binnning width, we need to parse the whole data. A mapred before an actual mapred!
Or we can use a sample dataset. The build-in samplers provided by Mapred are:
SplitSampler: Sample data contains only the first n values, obtained from the split at nth value.
IntervalSampler:Sample data contains every nth value, where 1\<n\<size_of_dataset
RandomSampler: Picks datavalues randomly
The time taken to work on sampled set is few seconds as comapred to the whole dataset.
```
	A     A
	B     B
	C     C 
```
when concatinated in a single file. (the output of a reducer is dumped all at once in chunks)
```
	A
	A
	B
	B
	C
	C
```
is a totally sorted output.

<strong>Secondary Sorting</strong> 
The MapReduce sorts records by the key before they are passed to the reducers. However, for the same key, the values are not sorted. Infact, the mapreduce programs are written such that they independent of the order of the values. This is because, values with same keys might end up in different partitions, or are written at different time. Users can still impose ordering on value as well. Here the whole \<key,value\> gets treated as a compsite \<KEY\> for the purpose of sorting. The sorting happens on the basics of the natural(original) key, but in case of duplicacy the natural value comes to the rescue.

<strong>Eg:</strong> \<key, value\> = \<First_Name, Last_Name\>
By default only the First_Name is sorted. In case of matching First_Name, the Last_Name  are randomly ordered. By using \<First_Name, last name\> as a composite key \<Name\>, better results are obtained.

This sums up the basics about the two most widely applied features of MapReduce. Watch out this space for more!
