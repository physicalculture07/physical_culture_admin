import React, { useState } from "react";

const TestForm = ({ onClose, fetchTestList }) => {
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    image: null,
    seriesId: "",
    questions: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTestData({ ...testData, image: files[0] });
    } else {
      setTestData({ ...testData, [name]: value });
    }
  };

  const addQuestion = () => {
    setTestData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
          marks: 1,
          negativeMarks: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    const newQuestions = [...testData.questions];
    newQuestions.splice(index, 1);
    setTestData({ ...testData, questions: newQuestions });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex][field] = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex].options[optIndex].option = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (qIndex, correctIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(
      (opt, idx) => ({
        ...opt,
        isCorrect: idx === correctIndex,
      })
    );
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", testData.title);
      formData.append("description", testData.description);
      formData.append("duration", testData.duration);
      formData.append("totalMarks", testData.totalMarks);
      formData.append("passingMarks", testData.passingMarks);
      formData.append("seriesId", testData.seriesId);
      if (testData.image) formData.append("image", testData.image);

      // Convert questions to proper format
      const formattedQuestions = testData.questions.map((q) => ({
        question: q.question,
        options: q.options,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
      }));
      formData.append("questions", JSON.stringify(formattedQuestions));

      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND_URL}/admin/create_newtest`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Test created successfully");
        onClose();
        if (fetchTestList) fetchTestList();
      } else {
        console.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div>
      <h2>Create Test</h2>
      <input
        name="seriesId"
        placeholder="Series ID"
        value={testData.seriesId}
        onChange={handleChange}
        required
      />
      <input
        name="title"
        placeholder="Title"
        value={testData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={testData.description}
        onChange={handleChange}
      />
      <input
        name="duration"
        type="number"
        placeholder="Duration (min)"
        value={testData.duration}
        onChange={handleChange}
        required
      />
      <input
        name="totalMarks"
        type="number"
        placeholder="Total Marks"
        value={testData.totalMarks}
        onChange={handleChange}
        required
      />
      <input
        name="passingMarks"
        type="number"
        placeholder="Passing Marks"
        value={testData.passingMarks}
        onChange={handleChange}
        required
      />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <hr />
      <h3>Questions</h3>
      <button type="button" onClick={addQuestion}>
        + Add Question
      </button>
      {testData.questions.map((question, qIndex) => (
        <div
          key={qIndex}
          style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}
        >
          <input
            placeholder="Question Text"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(qIndex, "question", e.target.value)
            }
            style={{ width: "100%" }}
          />
          {question.options.map((opt, optIndex) => (
            <div key={optIndex}>
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt.option}
                onChange={(e) =>
                  handleOptionChange(qIndex, optIndex, e.target.value)
                }
              />
              <input
                type="radio"
                name={`correctOption-${qIndex}`}
                checked={opt.isCorrect}
                onChange={() => handleCorrectOptionChange(qIndex, optIndex)}
              />
              <label>Correct</label>
            </div>
          ))}
          <input
            type="number"
            placeholder="Marks"
            value={question.marks}
            onChange={(e) =>
              handleQuestionChange(qIndex, "marks", Number(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Negative Marks"
            value={question.negativeMarks}
            onChange={(e) =>
              handleQuestionChange(qIndex, "negativeMarks", Number(e.target.value))
            }
          />
          <button type="button" onClick={() => removeQuestion(qIndex)}>
            Remove Question
          </button>
        </div>
      ))}

      <br />
      <button onClick={handleCreate}>Create Test</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default TestForm;
