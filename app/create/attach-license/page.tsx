"use client"
import React, { useState } from 'react';

const Survey = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  

  const questions = [
    {
      question: "Should remixes be required to attribute the original work?",
      options: ["Yes", "No"],
    },
    {
      question: "What should the licensing fee be to remix the work?",
      inputType: "dollars", // User enters text
    },
    {
      question:
        "What percentage of revenue do you expect from sales of remixes?",
      inputType: "range", // Range input for percentage
      range: { min: 0, max: 100 },
    },
    {
      question: "When should the license for this work expire?",
      inputType: "date"
    },
  ];
  const handleInputChange = (value: string, questionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const isNextDisabled =
  !answers[currentPage] || // No value provided for the current question
  (questions[currentPage].inputType === "number" && answers[currentPage] === "") || // Empty number input
  (questions[currentPage].inputType === "range" && answers[currentPage] === null); // No slider value set

  const handleNext = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
  <h1
  style={{
    fontSize: "2.5rem", // Increase font size
    fontWeight: "bold", // Ensure the font is bold
    marginTop: "20px",
    marginBottom: "20px", // Add some spacing below the heading
  }}
>
  Create License
</h1>
  <div>
    <h2>{questions[currentPage].question}</h2>

    <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
      {questions[currentPage].options?.map((option, index) => (
        <div key={index} style={{ margin: "30px 0" }}>
          <label
            style={{
              display: "block",
              width: "100%",
              maxWidth: "400px", // Limit the width of each option
              margin: "0 auto", // Center align the options
              cursor: "pointer",
              padding: "10px 20px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              border: "2px solid gray",
              backgroundColor: "white",
              color: "black", // Set text color to black
              transition: "0.3s",
            }}
            htmlFor={`option-${currentPage}-${index}`}
          >
            <input
              type="radio"
              id={`option-${currentPage}-${index}`}
              name={`question-${currentPage}`}
              value={option}
              style={{
                appearance: "none",
                display: "none", // Hide the default radio button
              }}
              onChange={(e) => {
                handleInputChange(option, currentPage)
                const inputs = document.getElementsByName(
                  `question-${currentPage}`
                ) as NodeListOf<HTMLInputElement>;

                inputs.forEach((input) => {
                  const label = document.querySelector(
                    `label[for="${input.id}"]`
                  ) as HTMLLabelElement;
                  label.style.backgroundColor = "white"; // Reset to default
                  label.style.borderColor = "gray"; // Reset to default
                  label.style.color = "black"; // Reset text color to black
                });

                // Highlight the selected option
                const selectedLabel = document.querySelector(
                  `label[for="${e.target.id}"]`
                ) as HTMLLabelElement;
                selectedLabel.style.backgroundColor = "#007bff"; // Selected color
                selectedLabel.style.color = "white"; // Change text color to white for selected
                selectedLabel.style.borderColor = "#007bff"; // Selected border
              }}
            />
            {option}
          </label>
        </div>
      ))}
    </div>

    {questions[currentPage].inputType === "dollars" && (
        <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}>
        <span
            style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            }}
        >
            $
        </span>
        <input
            type="text"
            placeholder="Enter a licensing fee"
            value={answers[currentPage] ? `${answers[currentPage]}` : ""}
            onChange={(e) => {
            let value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers & decimal
            if (value.startsWith(".")) value = "0" + value; // Ensure valid decimal format
            setAnswers((prev) => ({ ...prev, [currentPage]: value }));
            }}
            style={{
            padding: "8px 10px 8px 25px", // Left padding to avoid overlap with "$"
            width: "100%",
            maxWidth: "400px",
            border: "2px solid gray",
            borderRadius: "5px",
            fontSize: "16px",
            textAlign: "left",
            }}
        />
        </div>
    )}

    {questions[currentPage].inputType === "range" && (
        <div style={{ textAlign: "center" }}>
        <input
            type="range"
            min={questions[currentPage].range?.min}
            max={questions[currentPage].range?.max}
            value={answers[currentPage] || "0"} // Use initial value or default to 0
            onChange={(e) => {
                handleInputChange(e.target.value, currentPage)
                const value = e.target.value;
                setAnswers((prev) => ({ ...prev, [currentPage]: value }));
            }}
            style={{
            margin: "30px auto",
            width: "100%",
            maxWidth: "400px", // Limit the width of the input
            }}
        />
        <div style={{ marginTop: "2px", marginBottom: "40px", fontSize: "24px", fontWeight: "bold" }}>
            {answers[currentPage] || 0}%
        </div>
        </div>
    )}

    {questions[currentPage].inputType === "date" && (
      <input
        type="date"
        className="w-full p-2 border rounded"
        style={{
          margin: "30px auto",
          width: "100%",
          maxWidth: "400px", // Limit the width of the input
        }}
      />
    )}
  </div>

  <div style={{ marginTop: "20px" }}>
    <button
      onClick={handleBack}
      disabled={currentPage === 0}
      style={{
        marginRight: "10px",
        backgroundColor: currentPage === 0 ? "#cccccc" : "#007bff",
        color: currentPage === 0 ? "#666666" : "white",
        cursor: currentPage === 0 ? "not-allowed" : "pointer",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
    >
      Back
    </button>
    {currentPage < questions.length - 1 ? (
        <button
        onClick={handleNext}
        disabled={
        isNextDisabled
        }
        style={{
        backgroundColor: isNextDisabled ? "#cccccc" : "#007bff",
        color: isNextDisabled ? "#666666" : "white",
        cursor: isNextDisabled ? "not-allowed" : "pointer",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        }}
    >
        Next
        </button>
    ) : (
      <button
        onClick={() => {
          window.location.href = "/profile"; // Redirect to the "Thank You" page
        }}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          cursor: "pointer",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        Finish
      </button>
    )}
  </div>
</div>
  );
};

export default Survey;