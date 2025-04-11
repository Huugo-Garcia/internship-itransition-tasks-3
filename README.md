# 🎲 Task 3 – Generalized Fair Dice Game

This project is part of the Frontend Developer Internship at Itransition and consists of implementing a **console-based generalized dice game**. The game must incorporate a provably fair random number generation process using cryptographically secure methods.

---

## 📜 Problem Description

Your application must:

- Accept **3 or more command-line arguments**, each representing a dice configuration.
- Each dice configuration is a string containing **6 comma-separated integers** (e.g., `2,2,4,4,9,9`).
- Validate the input: if there are too few dice, missing values, or non-integer values, display an **informative error message** (in English) with an example of correct usage.
- **Dice configuration** is passed as command-line arguments, not from interactive input.

---

## 🔑 Key Requirements

- **Input Validation:**

  - **Minimum 3 dice** must be provided.
  - Each dice configuration must consist of exactly **6 integers**.
  - If incorrect, display a neat error message with an example (e.g., usage: `python game.py 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3`).

- **Provable Fair Randomness:**
  - **Determining First Move:**
    - The game must determine who moves first using a provably fair method.
    - A cryptographically secure one-time random key of **at least 256 bits** is generated.
    - A secure random integer is generated uniformly in the required range.
    - Calculate an **HMAC (based on SHA3)** over the random integer using the generated secret key.
    - The HMAC is **shown to the user before** the user makes any selection.
    - **Important:** A new secret key must be generated for every HMAC calculation.
- **Gameplay Flow:**

  1. **Initial Fair Random Generation:**
     - Determines which player (computer or user) selects dice first.
  2. **Dice Selection:**
     - Both computer and user must select **different dice** from the available configurations.
  3. **Throw Process:**
     - In each throw, both the computer and the user generate a random value.
       - The computer generates its value with the fair protocol (HMAC shown, then value and key revealed later).
       - The user inputs a number in the same range.
       - The final result is computed as the sum of the two numbers modulo the number of dice faces.
  4. **Help Option:**
     - The game must provide a help option (e.g., by entering “?”) to display an ASCII table showing the **winning probabilities for each dice pair**.
     - **Note:** Use a third-party library for rendering the console table.

- **Fair Randomness Protocol (Detailed):**

  - **Step 1:** Generate a **cryptographically secure random key** (≥ 256 bits) using appropriate APIs.
  - **Step 2:** Generate a secure random integer in the required range (e.g., 0 to N-1, where N is the number of faces). Note that using the `%` operator alone is not enough for uniform distribution.
  - **Step 3:** Calculate the **HMAC** (using SHA3) of the random integer, using the generated key.
  - **Step 4:** Display the HMAC to the user **before** the user makes their selection.
  - **Step 5:** After the user inputs their value, reveal the computer’s random number along with the secret key. This allows the user to verify that the initial HMAC matches the disclosed values.
  - **Result:** This process ensures that the computer cannot cheat by changing its number after seeing the user’s input.

- **Dice and Game Abstraction:**
  - The solution must be implemented following an **object-oriented approach** with a clear separation of concerns.
  - **Mandatory Classes (at least 6–9 classes):**
    - **Dice Configuration Parser:** Validates and parses command-line arguments.
    - **Dice Abstraction:** Represents a dice with arbitrary face values.
    - **Fair Random Generation Protocol:** Implements the overall protocol for fair random number generation.
    - **Secure Key/Random Number & HMAC Generator:** Handles key generation, random number generation, and HMAC calculation.
    - **Probability Calculator:** Computes win probabilities between dice.
    - **Console Table Generator:** Generates help tables with win probabilities using a third-party library.
    - Additional classes for game logic and the user interface are encouraged.

---

## 🎮 Sample Execution & Output

Below is an example of how the game interaction might look:

```markdown
> java -jar game.jar 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
> Let's determine who makes the first move.
> I selected a random value in the range 0..1 (HMAC=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A).
> Try to guess my selection.
> 0 - 0
> 1 - 1
> X - exit
> ? - help
> Your selection: 0
> My selection: 1 (KEY=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2).
> I make the first move and choose the [6,8,1,1,8,6] dice.
> Choose your dice:
> 0 - 2,2,4,4,9,9
> 1 - 7,5,3,7,5,3
> X - exit
> ? - help
> Your selection: 0
> You choose the [2,2,4,4,9,9] dice.
> It's time for my throw.
> I selected a random value in the range 0..5 (HMAC=AA29E7275FE17A8D1184E2D4B6B0F46D815224270C94907CF007F2118CF400F7).
> Add your number modulo 6.
> 0 - 0
> 1 - 1
> 2 - 2
> 3 - 3
> 4 - 4
> 5 - 5
> X - exit
> ? - help
> Your selection: 4
> My number is 3 (KEY=7329ABD54A1633D2079EA7A48B401018D7EE6DD4C130AB5C31BC029CC8359637).
> The result is 3 + 4 = 1 (mod 6).
> My throw is 8.
> It's time for your throw.
> I selected a random value in the range 0..5 (HMAC=652863C27870CCA331458F4658D89413F405736FE5AA19B868FBDDAB5611A406).
> Add your number modulo 6.
> 0 - 0
> 1 - 1
> 2 - 2
> 3 - 3
> 4 - 4
> 5 - 5
> X - exit
> ? - help
> Your selection: 5
> My number is 0 (KEY=92564A82A515DEBC3FE9842D20DCEA3F3AAFB2080314A09A1E9A2CC729EDAF44).
> The result is 0 + 5 = 5 (mod 6).
> Your throw is 9.
> You win (9 > 8)!
```

## 🎯 Purpose and Learning Outcomes

- **This task is designed to help you:**

  - Deepen your understanding of hash functions, HMAC, and provably fair random number generation.

  - Learn how to securely generate random numbers using cryptographic techniques.

  - Understand how a strict sequence of steps (secure key, random number, HMAC, user input, verification) can prevent cheating.

  - Work with command-line interfaces, external libraries, and object-oriented design.

  - Explore efficient ways to calculate win probabilities and render user-friendly console tables.

  - By completing this task, you demonstrate proficiency in not only coding but also in reading and interpreting detailed technical requirements, modularizing code, and employing best practices.
