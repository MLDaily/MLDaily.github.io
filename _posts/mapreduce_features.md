When huge datasets are under execution, it is hard to keep track of performance variables. The Mapreduce comes packes with anumber of features and utilities to help us aorund. Some of the key features include:
1. Counters
2. Sorting
3. Joins
4. Side Data Distribution

In this blog post, we will cover counters nd sorting in detail. 

Counters- They act pseudo checkpoints for your program, their values get incremented when a certain event is triggred. Counter are counter part of logs but in numeric format instead. The counter values can be used to provide statistical information about the health of the node and, progress of the job. Hadoop provides various build in counters, divided in groups. Each group either contains atleast a task counter or a job counter.
	Task counters are updated througgh the course of an individual task, each job is broken into a number of tasks and each task has its own set of task counters. The task counters (as the name suggests) periodically send their infomation to their parent task tracker. The task tracker then handshakes this information to the job tracker for aggretation. The information obtained fromt he task counters can be read while the job is running, using the JAVA APIs to retirve the counter values. This keeps the user updated about the status of the tasks.
EG: FILE_OUTPUT COUNTER- A type of FileOUtputFormat counter keeps track of number of data bytes wriiten by mapper during intermediate storage of mapped data in the local file system. The aggregate of which gives the total bytes written at the end of mapping.
	Job Counters are execusively maintained by the job tracker, and they are neer communicated across the network. The job counters measure the job_level(global changes).
Eg: Data_Local_Maps and Rack_Local_Maps- they count the number of jobs that ran on the node and same rack respectively, as the input data.

In addition to the numerous build in couter, mapreduce has provision for custom counters as well. So the user can create counters as per his need. By default the counter are of Java enum type. The enum fileds act as counter names, and are incremented as per desired event. Counters are global in nature.But enum based counters come with a setback, they are not dynamic in nature, Java enum fileds get initiatiled and defined at compile time. So its fields (names and total number) cannot be modified on the go. To overcome this we can use the Java String objects whose value can be dynamically changed.
Thus, there are 2 ways of definign counters, either via enums or string. Even though most RPC calls (Mapred performs many) convert the num fileds to string, enums are more widely used for their easy of execution.

Sorting:
Sorting algorithms form the heart of mapreduce paradigm. Even if your dataset is not sort oriented, it can and usually does, utilize the sorting ability of mapred to sort out things!(faster)
 Partial Sorting: By default, Mapreduce sorts the input records by their keys. But, you can easily override the default sort order. Thus in our exmaple the dataset is sorted by the names (alphabetically). The sorted result of a mapreduce is not a problem if the datset is small and only one reduce job is run. Problem occurs in case of multiple reducers. The final output of each reducer is sorted, but I simply write back the sorted data of each reducer into the output file, then the global output is not sorted.
A A
B B
C C 
when concatinated:
A
B
C
A
B
C
C
is a partially sorted output. The searching time in thsi file is comparable with linear search time (for huge datasets)
Thus, partial sorting might not useful in every scenario.

	Total Sorting: By now, you would ahve gussed what a total sort does. Yes! it presents a globally sorted data. How is that possible?
Quite possible if only one reducer is run(which by deafult partially sorts the whole data to give total sort). But we are not exploiting the Hadoop through a single job. Another possible method is bining. We divide the data into partitions, where each set operates on a range of data. But to optimise the binnning width, we need to parse the whole data. A mapred before an actual mapred!
Or we can use a sample dataset. The build in samplers provided by Mapred are:
SplitSampler: Sample data contains only the first n values, obtained from the split at nth value.
IntervalSampler:Sample data contains every nth value, where 1<n<size_of_dataset
RandomSampler: Picks datavalues randomly.


Secondary Sorting: The mapreduce sorts records by the key before they are passed to the reducers. For the same key, the values are not sorted. Infact, the mapreduce programs are written as such, that they independent of the order of the values. This is because, values with same keys might end up in different partitions, or are written at different time. However users can impose ordering on value as well. Here the whole <key,value> gets treated as a compsite <KEY> for the purpose of sorting. The sorting happens on the basics of the natural(original) key, but in case of duplicacy the natural value comes to the rescue.
Eg: <key, value>=<first name, last name>
By default sorting ony the fisrt name is sorted. In case of matching first names, the last names are randomly ordered. By using <first name, last name> as a composite key <name>, better results are obtained.

