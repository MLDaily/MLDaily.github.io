---
layout: main
mathjax: true
comments: true
title:  "Linear Regression"
date:   2016-01-08 10:39:27
categories: Regression
excerpt: The base of supervised machine learning
---


<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
  MathML: {
    extensions: ["content-mathml.js"]
  }
});
</script>
<script type="text/javascript" async src="{{ "/js/MathJax.js?config=TeX-AMS_CHTML" | prepend: site.baseurl }}"></script>


In our last post we explained how we make a machine learn. If we think about it, we are iteratively moving towards a better result every time the model is improving. The simple data model developed will now also be able to estimate a new input set and produce a valid output. This is what we could think of as the basis of machine learning.

<strong>Regression</strong> <br>
It is something similar to the idea we developed. In statistics, regression can be thought of as the modelling of a relationship between an input variable (X) and an output variable (Y). The input variables are explanatory variables (or independent variables) while the output variable is the dependent variable, dependent on the input variable. The explanatory variables represent the inputs or the causes, i.e. potential reasons for variation. The created models explain the effects that the independent variables have on the dependent variables.

Let us look at a basic approach to regression. Below is an image showing some points on the graph plotted according to the x values and their corresponding y values. The x values represent our input to the data while the y values represent the corresponding output to each of the inputs.

<img src="{{ "/images/Linear_regression.png" | prepend: site.baseurl }}" >

We fit the best curve which can represent the relation between the x values and their corresponding y values. The equation of the curve is our required model of the relation between X and Y. Now, this curve can be linear or polynomial. When the curve is a line, it is said to be linear regression while it is said to be polynomial regression when it is a polynomial curve. It always depends on the data provided/observed (the given training data) whether it will be a line or a curve. So, we have to form an equation of relationship among X and Y and our job is done, the system will do the rest. Or will it ?

<strong>Hypothesis</strong> <br>
The equation we were talking about above, let us call it our hypothesis equation. For linear regression, the equation will simply be the equation of a line, which can be written as,<br>


<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <msub><mi>h</mi><mi>&#x3b8;<!--THETA--></mi></msub>
      <mtext>( </mtext><msup><mi>X</mi> <mi>i</mi></msup> <mtext> )</mtext> <mo>=</mo>
  <mrow>
      <msub><mi>&#x3b8;<!--THETA--></mi>
      <mn>0</mn></msub>
      <mo>+</mo>
      <msub><mi>&#x3b8;<!--THETA--></mi>
      <mn>1</mn></msub>
      <mi>X</mi>
  </mrow>
  <mtext>.</mtext>
</math><br>

Where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <!-- <mi>&#x3b8;THETA</mi> <mo>=</mo> -->
    <!-- <mtext>[ </mtext> -->
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>0</mn></msub> <mtext>, </mtext>
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>1</mn></msub>
    <!-- <mtext> ]</mtext> -->
</math> are constants in the linear equation which can be represented by the vector <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <mi>&#x3b8;<!-- THETA --></mi>.
</math>

If we assume the vector <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <mi>X</mi> <mo>=</mo> <mtext>< </mtext> <mn>1</mn>, <mi>X</mi>  <mtext> ></mtext>
</math> then we can also write the above equation in the form of multiplication of two vectors, as,

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <msub><mi>h</mi><mi>&#x3b8;<!--THETA--></mi></msub>
      <mtext>( </mtext><msup><mi>X</mi> <mi>i</mi></msup> <mtext> )</mtext> <mo>=</mo>
  <mrow>
      <msup><mi>&#x3b8;<!--THETA--></mi>
      <mn>T</mn></msup>
      <mi>X</mi>
  </mrow>
  <mtext>.</mtext>
</math><br>


where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <msup><mi>&#x3b8;<!--THETA--></mi>
      <mn>T</mn></msup>
</math> is the transpose of <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <mi>&#x3b8;<!--THETA--></mi>
</math>.

This can be represented as a function (python language) :

	def hypothesis(x,theta):

		tran = np.transpose(theta)
		z = np.dot(tran,x)

		return z

The hypothesis is a simple representation, but how do we attain this model or relation ? Let us think about this. We have hundreds, maybe thousands of points on the graph, how would we fit the best line ? The best line must have maximum number of points on itself. Also, the points which do not lie on the lie, must have a minimum distance from the line in order to reduce an error percentage. This requires calculating the cost of the error each time we fit a line and to minimise that error as much as possible. Next we study these two techniques.

<strong>Cost Function</strong> <br>
We are going to understand how to calculate the cost. There could be two methods to do this. First, minimise the values of <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>0</mn></msub> <mtext> and </mtext>
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>1</mn></msub>
</math> so that the ( predicted value -  actual value ) is minimum. The other could be the equation given below. In this, we are finding the distance between two points, the predicted point and the actual point, and we are attempting to minimise this distance. The distance is calculated using the euclidean distance, but we ignore the square root (the values calculated might be small). The (2m) is only for ease of calculation.

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">

<munder>
<mtext>min</mtext>
<mrow>
	<msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>0</mn></msub> <mtext>, </mtext>
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>1</mn></msub>  
</mrow>
</munder>

  <mi>J</mi><mtext>( </mtext><msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>0</mn></msub> <mtext>, </mtext>
    <msub><mi>&#x3b8;<!--THETA--></mi>
    <mn>1</mn></msub>  <mtext> )</mtext> <mo>=</mo>

    <mfrac>
    <mrow>
      <mn>1</mn>
    </mrow>
    <mrow>
      <mn>2</mn>
      <mi>m</mi>
    </mrow>
  </mfrac>

    <munderover>
  <mo>&#x2211;<!--N-ARY SUMMATION--></mo>
  <mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow>
  <mi>n</mi>
 </munderover>
 	<msup>
 	<mrow>
 	  <mtext>( </mtext>
      <msub><mi>h</mi><mi>&#x3b8;<!--THETA--></mi></msub>
      <mtext>( </mtext><msup><mi>X</mi> <mi>i</mi></msup> <mtext> )</mtext>
      <mo>-</mo>
      <msup><mi>Y</mi>
      <mi>i</mi></msup>
	  <mtext> )</mtext>
	  </mrow>
  	  <mn>2</mn>
  	</msup>
</math><br>

This equation can be represented in the form of a function as:

	def costFunction(theta,x,y):

		J = 0

		for i in range(m):

			yi = y[i:i+1]		#ith value
			xi = x[i:i+1]		#ith value
			hyp = hypothesis(xi,theta)

			a = np.subtract( hyp , yi )
			a = np.square( a )

			J += np.divide(a,2m)

		return J


The equation above represents the Cost Function. This cost function needs to be minimum in order for our regression line to be most effective. To minimise this function, we iteratively reduce the values of our <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
    <mi>&#x3b8;<!--THETA--></mi>
</math> vector. This is explained next.

<!-- <strong>Gradient Descent</strong> <br> -->



