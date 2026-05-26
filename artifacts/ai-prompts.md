# AI Prompts & AI-Assisted Development Notes

## Overview

AI tools were intentionally used throughout development to accelerate implementation while maintaining engineering quality, correctness, and architectural consistency.

The goal was not to blindly generate code, but to:
* Speed up repetitive implementation
* Validate architectural decisions
* Improve development velocity
* Assist with boilerplate generation
* Review tradeoffs
* Improve documentation quality

All AI-generated outputs were manually reviewed, refactored, and validated before integration.

---

## AI Usage Philosophy

AI was treated as:
* A development accelerator
* An architecture assistant
* A brainstorming partner

**NOT as:**
* A source of unquestioned truth
* A replacement for engineering decisions
* A replacement for debugging or validation

Every generated output was:
* Reviewed
* Tested
* Refactored where necessary
* Aligned with the project architecture

---

## Primary Prompt (ChatGPT)

```text
Project Requrement doc content here

---------------------------------------------------------------------------------------------------

You are an SDE-II. Your task is to generate comprehensive development phases for a small web application based on a provided task description.

Constraints and Requirements

No Component Library: Do not use any external component libraries. This is a very small application and does not require one.

Shadcn UI Context: In your explanation, explicitly state that if this were a larger application, you would have considered using a component library like Shadcn UI.

No Rework Policy: The generated phases must be designed such that, once implemented according to a phase, no file or component from that phase needs to be revisited or recoded in subsequent phases. The workflow must prevent any future rework.

Avoid Overengineering: While adhering to the "no rework" policy, ensure that the proposed solution does not introduce unnecessary complexity or overengineering for a small application.

Consistent Approach: Maintain a singular and consistent approach throughout the architecture. Do not mix patterns like using common functions/types in one place and component-specific functions/types in another.

Design Patterns: Integrate the following design patterns consistently across all phases:

Common Component (for shared, atomic UI elements if any, but without a library)

MVC (Model-View-Controller)

Modular Architecture

Service-Based Architecture

Single Source of Truth

No Assumptions: If the provided task description is unclear or incomplete, explicitly state any queries or information you need to proceed. Do not make assumptions.

Steps

Analyze Task Description: Carefully review the provided [TASK_DESCRIPTION] to understand the web app's functionality, rules, technologies, and constraints.

Architectural Design: Based on the [TASK_DESCRIPTION] and the design patterns specified, conceptualize the overall architecture that ensures modularity, service-orientation, MVC separation, and a single source of truth, while strictly avoiding rework.

Phase Definition: Break down the development process into distinct, logical phases. Each phase should build upon the previous one without requiring changes to already completed components.

For each phase, provide a clear explanation of its purpose, the components or modules developed within it, and how it adheres to the "no rework" principle and specified design patterns.

Include the required statement about Shadcn UI within a relevant phase explanation.

Test Case Generation (Per Phase): For each phase that involves implementing functionality, generate corresponding test cases relevant to that specific phase. Do not create a separate, final testing phase; integrate tests with the development of each functional phase.

Describe what each test case validates and how it confirms the correct implementation and adherence to requirements for that particular phase.

Input


[TASK_DESCRIPTION]


(Assume a task description for a web application will be provided here by the user.)

Output Format

Provide a numbered list of development phases. Each phase entry should follow this structure:


**Phase [Number]: [Phase Name]**

**Explanation:**

[Detailed explanation of the phase's objectives, what components or modules are developed, how it integrates the required design patterns (MVC, Modular, Service-Based, Single Source of Truth, Common Component), and specifically how it ensures no rework for previous phases. Include the statement about Shadcn UI if relevant to this phase's context.]

**Test Cases for Phase [Number]:**

* [Test Case 1 Description: What is being tested and why it's crucial for this phase.]

* [Test Case 2 Description: What is being tested and why it's crucial for this phase.]

* [Add more test cases as needed.]
```

---

## Tooling Strategy & Developer Notes

**Workflow Process**
* AI was used to establish the architectural phases first, followed by phase-wise code generation. 
* This localized approach made code review, testing, and debugging significantly easier and massively decreased AI hallucinations.

**AI Model Selection**
* **ChatGPT:** Used as the primary tool for phase and code generation due to the lack of strict chat limits, allowing for the extended context required for long development threads.
* **Claude:** A preferred alternative for coding tasks, but omitted from this project due to the lack of a paid tier.
* **Gemini:** Deployed specifically for scoped bug solving and targeted phase enhancements. This strategy was used to avoid interrupting the main ChatGPT thread, ensuring the primary context window remained focused and hallucination-free.

**Version Control**
* *Note on Commits:* In the early stages of the project, commit granularity per phase was missed. To correct this, the code was pushed phase-wise later in the cycle. 

**Issue**
* *Prompt corretion:* In prompt i mentioned modular and mvc and service base structure where i should have stated mvc for backend and modular and service base for frontend this was big mistake on my side. 

*(Reference Link: [https://chatgpt.com/share/6a156bcd-26dc-8324-9321-c0c90ef760be])*