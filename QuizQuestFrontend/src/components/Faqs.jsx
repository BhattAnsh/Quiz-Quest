/** @format */

import React, { useState } from "react";
import "./Faqs.css";

const faqs = [
	{
		question: "What is Quiz-Quest?",
		answer:
			"Quiz-Quest is an interactive platform that offers a wide selection of quizzes to help you test and expand your knowledge across various topics, from coding and tech to general knowledge.",
	},
	{
		question: "How do I participate in a quiz on Quiz-Quest?",
		answer:
			"Simply create an account, browse through our quiz categories, select the quiz you want, and start challenging yourself. Each quiz is designed to make learning fun and engaging.",
	},
	{
		question: "Are there any rewards or certificates for completing quizzes?",
		answer:
			"Yes! Upon successfully completing certain quizzes, you may earn certificates or other rewards to recognize your accomplishments.",
	},
	{
		question: "Can I track my progress on Quiz-Quest?",
		answer:
			"Absolutely! Your account dashboard allows you to keep track of your quiz history, scores, and any rewards you've earned.",
	},
	{
		question: "What payment methods are accepted on Quiz-Quest?",
		answer:
			"We accept various payment methods, including credit/debit cards and popular online payment systems, for any premium quizzes or features. Available options will be listed at checkout.",
	},
	{
		question: "Are there any free quizzes available?",
		answer:
			"Yes, we offer a selection of free quizzes so you can explore different topics and test your skills at no cost.",
	},
	{
		question: "How can I reset my password?",
		answer:
			"If you've forgotten your password, simply click on the 'Forgot Password?' link on the login page, and follow the instructions to reset it.",
	},
	{
		question: "Can I create and submit my own quizzes on Quiz-Quest?",
		answer:
			"Currently, quizzes are created by our team of experts, but we are exploring options for user submissions. Stay tuned for updates!",
	},
	{
		question: "Is my payment information secure on Quiz-Quest?",
		answer:
			"Yes, we use industry-standard security measures to protect your payment and personal information. For more details, please review our privacy policy.",
	},
	{
		question: "Can I review my answers after completing a quiz?",
		answer:
			"Yes, after completing a quiz, you can review your answers and see detailed explanations for any questions you missed.",
	},
	{
		question: "Are quizzes on Quiz-Quest timed?",
		answer:
			"Some quizzes are timed to add an extra challenge, while others let you proceed at your own pace. Check the quiz details to see if there's a time limit.",
	},
	{
		question: "Can I retake a quiz?",
		answer:
			"Yes, you can retake most quizzes as many times as you'd like. This is a great way to reinforce learning and improve your score!",
	},
	{
		question: "How often is new content added to Quiz-Quest?",
		answer:
			"We regularly update our platform with new quizzes and topics to keep the content fresh and engaging. Check back often for new additions!",
	},
	{
		question: "What topics are covered on Quiz-Quest?",
		answer:
			"We offer quizzes on a variety of topics, including programming languages, algorithms, web development, data science, and much more.",
	},
	{
		question: "Can I share my quiz results on social media?",
		answer:
			"Yes! After completing a quiz, you’ll have the option to share your results with friends on social media platforms.",
	},
];

const Faqs = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleAnswer = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="w-[100vw] h-auto bg-richblack-800 pt-10 pb-10">
			<div className="faq-container bg-richblack-700 ">
				<h1 id="faqs">Frequently Asked Questions</h1>
				{faqs.map((faq, index) => (
					<div
						className={`faq-item ${activeIndex === index ? "active" : ""}`}
						key={index}>
						<h3 onClick={() => toggleAnswer(index)}>{faq.question}</h3>
						<p className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
							{faq.answer}
						</p>
					</div>
				))}
				<div className="button-container">
					<a
						href="/"
						className="back-button">
						Back to Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default Faqs;
