#FEATURES OF MAPREDUCE PART-2

Well, continuing with the features of Mapreduce, in this blog we shall be covering the Joins and Side Data Distribution.

##JOINS
Let us re-use the old dummy dataset of names. Along with this dataset, let us assume another, equally large dataset of \<First_Name, Age\>.
Now, suppose you wish to determine how many people with Last_Name starting with P, are aged 25. We have combine the information from the two datasets, to be able to query it. This is where the concept of <strong>Joins</strong>(literally joining 2 or more datasets) comes into picture. Joining in MapReduce can be performed either by a Mapper, or by a Reducer. If the join is performed by the Mapper, it is called <strong>Map-Side Join</strong>. The join performed by the reducer is called the <strong>Reduce-Side Join.</strong>

**Map-Side Joins** 

The datasets used in the map-side joins must be divided into equal number of partitions, and each partition must be sorted using the same join key. In our case the First_Name. Map-side joins work best when the output files are not splittable(i.e they do not span more than a block).
Perfoming partial sort on individual files, using the same number of reducers, gives the combined output of map-side join on the data.

**Reduce-Side Joins**

A reduce side join is more generic in nature, and does not require sorted data to work upon. The mapper uses the join key as the map output key, and the records with same key are brought together in the same reducer. In our case, the output of both mappers are sorted by First_Name, then all \<key,value\> with same First_Name are brought together. The reducer combines the matching keys to create the composite dataset. Three features of MapReduce that aid in reduce-side joining are:
* Multiple Inputs
* Secondary Sorting
* Data Buffering
 
Lets briefly check upon these features.

###Multiple Inputs

Data that is streamed to the MapReduce can be of various types, various types of input files, and even with files with same extension, the delimiter can differ(i.e a .txt can have comma separated values, while another can have tab sperated values). Various files have be interpreted by a single input mapper, and it will work on *SingleInput* format. To be able to support multiple formats the *MultipleInput* format is used. This takes care of the separte parsing for each kind of datasource.

###Secondary Sort

The reducer may receive the partially sorted data in any order. But, for the purpose of joining we need the data to be ordered. If we want the dataset to be type \<Last_Name, Age\>, we have to ensure that the Names dataset gets to the reducer first, in all cases. Summing up, each instance of the reducer needs to follow the same pattern. Since the reducer knows the output form to be generated, and it already receives the partial outputs,the reducer uses them to filter out a part of the output.\<key,value\>

###Data Buffering
Another mechanism to have ordered data in the reducer is to use the buffers. The *data_join* packages which implements the reduce-side join uses data buffering to put together the out of order data. But the amount of memory available as buffer becomes a bottleneck. 

##Practical Implementation of Joins
 
Joins in Mapreduce are hardly written as a part of MapReduce program, for it can be very taxing. Developers instead, depend upon high level frameworks like <strong>Pig/Hive/Hbase</strong> to get their work done. These frameworks can be easily integrated with MapReduce, while providing easy of joining. We can use the SQL like query grammar instead of hard coding the joins. Also, like the SQL joins, joins in MapReduce can be either inner or outer. The type of join used, and its implementation depends upon the size of the datasets to be joined, with map-side joins prefered if atleast one of them is smaller in size.

##SIDE DATA DISTRIBUTION

**What is side data?**
	
<strong>Side data</strong> as the name suggests, is the extra data used along side with the main dataset, to aid in the processing of the main dataset. This side data needs to be present at every mapper and/or reducer node (which might need side data) in the most optimised manner(keeping in mind the load on the nodes and the network).

**Method 1- Using the JobConf(older verisions)/Configuration Objects**

One can easily override the *Configure()* methods of mapper or reducer. This will help store some data, that can be retrieved by the *getConfiguration()* methods. The information to be stored, is stored as instance of the JobConf object. But this method wastes a lot of time and memory, as each time the any configuration is read/changed, all the entries in the configuration are read, even if only one is to be used. 

**Method 2- Distributed Cache**

A better mechanism is to use the underlying HDFS's distributed cache mechanism, without worrying of its implement as Hadoop takes care of it. Using the <strong>-file,-archieves,-libjars</strong> switches, we copy specified files and JARs into the HDFS. During the job execution, the task tracker copies the files to its own disk(local cache). Now, the files are said to be *localised*. When ever the file is used the task-tracker loads the file into the desired program, and increments the counter by one. After the task is completed, the counter is decremented. Once the counter reaches zero, the file can be removed from the cache. The deafult cache size is <strong>10 GB</strong>. Once this is full to capacity, the cache replacements mechanism (works internally within Hadoop) is used, to bring in new files.

That sums up our discussion upon the four basics features of Mapreduce. In case you missed the previously discussed features. Here is the link:
[MapReduce Features  Part-1](http://mldaily.github.io/ml-algorithms/2015/11/03/mapreduce-features.html).
 

