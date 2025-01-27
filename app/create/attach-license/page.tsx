"use client"
import React, { useState } from 'react';

const Survey = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const questions = [
    {
      question: "Should remixes be required to attribute the original work?",
      options: ["Yes", "No"],
    },
    {
      question: "What should the licensing fee be to remix the work?",
      inputType: "number", // User enters text
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
    marginBottom: "20px", // Add some spacing below the heading
  }}
>
  Create License
</h1>
  <div>
    <h2>{questions[currentPage].question}</h2>

    <div>
      {questions[currentPage].options?.map((option, index) => (
        <div key={index} style={{ margin: "10px 0" }}>
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

    {questions[currentPage].inputType === "number" && (
      <input
        type="number"
        placeholder="Enter a licensing fee"
        style={{
          margin: "10px auto",
          padding: "5px",
          width: "100%",
          maxWidth: "400px", // Limit the width of the input
        }}
      />
    )}

    {questions[currentPage].inputType === "range" && (
      <input
        type="range"
        min={questions[currentPage].range?.min}
        max={questions[currentPage].range?.max}
        style={{
          margin: "10px auto",
          width: "100%",
          maxWidth: "400px", // Limit the width of the input
        }}
      />
    )}

    {questions[currentPage].inputType === "date" && (
      <input
        type="date"
        className="w-full p-2 border rounded"
        style={{
          margin: "10px auto",
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
        style={{
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
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