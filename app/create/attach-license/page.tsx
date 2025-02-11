"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const Survey = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0);
  const [licenseData, setLicenseData] = useState<AssetLicense>({
    requiresAttribution: undefined,
    licenseFee: undefined, 
    revenueShare: 0,
    expiration: undefined,
});

  interface AssetLicense {
    requiresAttribution: boolean | undefined;
    licenseFee: number | undefined;
    revenueShare: number | undefined;
    expiration: Date | "Never" | undefined;
  }
  
  const questions = [
    {
      question: "Should remixes be required to attribute the original work?",
      options: ["Yes", "No"],
      key: "requiresAttribution",
    },
    {
      question: "What should the licensing fee be to remix the work?",
      inputType: "dollars",
      key: "licenseFee",
    },
    {
      question: "What percentage of revenue do you expect from sales of remixes?",
      inputType: "range",
      key: "revenueShare",
      range: { min: 0, max: 100 },
    },
    {
      question: "When should the license for this work expire?",
      inputType: "date",
      key: "expiration",
    },
  ];

  const handleInputChange = (value: string | number | boolean | Date, key: keyof AssetLicense) => {
    setLicenseData((prev) => ({
      ...prev,
      [key]: key === "expiration" && value === "Never" ? "Never" :
            key === "licenseFee" && value === "" ? "" : value, // Allow empty input
    }));
  };

  const isNextDisabled = (() => {
    const currentQuestion = questions[currentPage];
    const key = currentQuestion.key as keyof AssetLicense;
    const value = licenseData[key];
  
    if (key === "requiresAttribution" && value === undefined) return true;
    if (key === "licenseFee" && (value === null || value === undefined || String(value).length === 0)) return true;
    if (key === "revenueShare" && value === 0) return true;
    if (key === "expiration" && value === undefined) return true;
  
    return false;
  })();

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
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "20px 0" }}>
        Create License
      </h1>

      <div>
        <h2>{questions[currentPage].question}</h2>

        {questions[currentPage].options && (
          <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            {questions[currentPage].options.map((option, index) => (
              <label 
                key={index} 
                style={{ 
                  cursor: "pointer",
                  padding: "10px 20px",
                  border: `2px solid ${licenseData.requiresAttribution === (option === "Yes") ? "#007bff" : "#cccccc"}`, // Highlight border when selected
                  backgroundColor: licenseData.requiresAttribution === (option === "Yes") ? "#007bff" : "transparent", // Keep background transparent when unselected
                  color: licenseData.requiresAttribution === (option === "Yes") ? "#ffffff" : "#000000", // Change text color accordingly
                  borderRadius: "8px",
                  transition: "0.3s ease-in-out",
                }}
              >
                <input
                  type="radio"
                  name={`question-${currentPage}`}
                  value={option}
                  checked={licenseData.requiresAttribution === (option === "Yes")}
                  onChange={() => handleInputChange(option === "Yes", "requiresAttribution")}
                  style={{ display: "none" }} // Hide default radio button
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {questions[currentPage].inputType === "dollars" && (
          <input
          type="text" // Keep it text to allow the "$" prefix
          placeholder="Enter a licensing fee"
          value={licenseData.licenseFee !== undefined && licenseData.licenseFee !== "" ? `$${Number(licenseData.licenseFee)}` : ""}
          onChange={(e) => {
            let inputValue = e.target.value;
        
            // Remove any non-numeric characters except for the decimal point
            inputValue = inputValue.replace(/[^0-9.]/g, "");
        
            // Convert to number but keep empty value when cleared
            const numericValue = inputValue === "" ? "" : parseFloat(inputValue);
        
            handleInputChange(numericValue, "licenseFee");
          }}
          style={{ padding: "8px", width: "100%", maxWidth: "400px", border: "2px solid gray", borderRadius: "5px" }}
        />
        )}

        {questions[currentPage].inputType === "range" && (
          <div>
            <input
              type="range"
              min={questions[currentPage].range?.min}
              max={questions[currentPage].range?.max}
              value={licenseData.revenueShare}
              onChange={(e) => handleInputChange(Number(e.target.value), "revenueShare")}
              style={{ margin: "30px auto", width: "100%", maxWidth: "400px" }}
            />
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>{licenseData.revenueShare}%</div>
          </div>
        )}

      {questions[currentPage].inputType === "date" && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          
          {/* Checkbox for "Never Expires" */}
          <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={licenseData.expiration === "Never"}
              onChange={(e) => handleInputChange(e.target.checked ? "Never" : new Date(), "expiration")}
              style={{ marginRight: "8px" }}
            />
            Never Expires
          </label>

          {/* Date Picker Input */}
          <input
            type="date"
            value={
              licenseData.expiration instanceof Date
                ? licenseData.expiration.toISOString().split("T")[0] // Stores properly
                : ""
            }
            onChange={(e) => {
              const localDate = new Date(e.target.value + "T00:00:00"); // Fix timezone shift
              handleInputChange(localDate, "expiration");
            }}
            disabled={licenseData.expiration === "Never"}
            style={{
              padding: "8px",
              width: "100%",
              maxWidth: "400px",
              border: "2px solid gray",
              borderRadius: "5px",
              backgroundColor: licenseData.expiration === "Never" ? "#f0f0f0" : "white",
              cursor: licenseData.expiration === "Never" ? "not-allowed" : "pointer",
            }}
            />
        </div>
      )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          style={{
            marginRight: "10px",
            backgroundColor: currentPage === 0 ? "#cccccc" : "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
          }}
        >
          Back
        </button>

        {currentPage < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            style={{
              backgroundColor: isNextDisabled ? "#cccccc" : "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: isNextDisabled ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.setItem('assetLicense', JSON.stringify(licenseData));
              router.push("/create/review-license");
            }}
            style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px", borderRadius: "5px" }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Survey;