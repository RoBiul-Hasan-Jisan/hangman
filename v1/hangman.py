import random
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import string
from word_file import words_diary

class HangmanGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Hangman Game")
        self.root.geometry("800x600")
        self.root.resizable(True, True)
        
        # Game variables
        self.secret_word = ""
        self.word_letters = set()
        self.used_letters = set()
        self.lives = 15
        self.max_lives = 15
        
        # Colors
        self.bg_color = "#2c3e50"
        self.btn_color = "#3498db"
        self.btn_hover = "#2980b9"
        self.text_color = "#ecf0f1"
        self.word_color = "#e74c3c"
        
        self.root.configure(bg=self.bg_color)
        
        # Setup UI
        self.setup_ui()
        self.new_game()
    
    def setup_ui(self):
        # Title
        title_label = tk.Label(
            self.root,
            text="HANGMAN GAME",
            font=("Arial", 32, "bold"),
            bg=self.bg_color,
            fg="#e74c3c"
        )
        title_label.pack(pady=10)
        
        # Lives frame
        self.lives_frame = tk.Frame(self.root, bg=self.bg_color)
        self.lives_frame.pack(pady=10)
        
        self.lives_label = tk.Label(
            self.lives_frame,
            text=f"❤️ LIVES: {self.lives}/{self.max_lives}",
            font=("Arial", 18, "bold"),
            bg=self.bg_color,
            fg="#27ae60"
        )
        self.lives_label.pack()
        
        # Hangman visual frame
        self.canvas_frame = tk.Frame(self.root, bg=self.bg_color)
        self.canvas_frame.pack(pady=10)
        
        self.canvas = tk.Canvas(
            self.canvas_frame,
            width=400,
            height=300,
            bg="#ecf0f1",
            highlightthickness=0
        )
        self.canvas.pack()
        
        # Current word display
        self.word_label = tk.Label(
            self.root,
            text="",
            font=("Courier", 36, "bold"),
            bg=self.bg_color,
            fg=self.word_color
        )
        self.word_label.pack(pady=20)
        
        # Letter buttons frame
        self.letters_frame = tk.Frame(self.root, bg=self.bg_color)
        self.letters_frame.pack(pady=20)
        
        # Create letter buttons
        self.letter_buttons = {}
        for i, letter in enumerate(string.ascii_uppercase):
            btn = tk.Button(
                self.letters_frame,
                text=letter,
                width=4,
                height=1,
                font=("Arial", 14, "bold"),
                bg=self.btn_color,
                fg="white",
                command=lambda l=letter: self.make_guess(l)
            )
            btn.grid(row=i//9, column=i%9, padx=2, pady=2)
            btn.bind("<Enter>", lambda e, b=btn: b.configure(bg=self.btn_hover))
            btn.bind("<Leave>", lambda e, b=btn: b.configure(bg=self.btn_color))
            self.letter_buttons[letter] = btn
        
        # Used letters display
        self.used_label = tk.Label(
            self.root,
            text="USED LETTERS: ",
            font=("Arial", 12),
            bg=self.bg_color,
            fg=self.text_color
        )
        self.used_label.pack(pady=10)
        
        # Control buttons frame
        self.control_frame = tk.Frame(self.root, bg=self.bg_color)
        self.control_frame.pack(pady=20)
        
        self.new_game_btn = tk.Button(
            self.control_frame,
            text="🔄 NEW GAME",
            font=("Arial", 12, "bold"),
            bg="#27ae60",
            fg="white",
            padx=20,
            pady=5,
            command=self.new_game
        )
        self.new_game_btn.pack(side=tk.LEFT, padx=10)
        
        self.quit_btn = tk.Button(
            self.control_frame,
            text="❌ QUIT",
            font=("Arial", 12, "bold"),
            bg="#c0392b",
            fg="white",
            padx=20,
            pady=5,
            command=self.root.quit
        )
        self.quit_btn.pack(side=tk.LEFT, padx=10)
    
    def new_game(self):
        # Reset game state
        self.secret_word = self.get_valid_word()
        self.word_letters = set(self.secret_word)
        self.used_letters = set()
        self.lives = self.max_lives
        
        # Reset letter buttons
        for letter, btn in self.letter_buttons.items():
            btn.config(state=tk.NORMAL, bg=self.btn_color)
        
        # Reset labels
        self.update_display()
        self.update_hangman_canvas()
    
    def get_valid_word(self):
        word = random.choice(words_diary)
        while '-' in word or ' ' in word:
            word = random.choice(words_diary)
        return word.upper()
    
    def update_display(self):
        # Update lives display
        self.lives_label.config(
            text=f"❤️ LIVES: {self.lives}/{self.max_lives}",
            fg="#27ae60" if self.lives > 5 else "#e74c3c" if self.lives > 2 else "#c0392b"
        )
        
        # Update word display
        display_word = " ".join([
            letter if letter in self.used_letters else "_"
            for letter in self.secret_word
        ])
        self.word_label.config(text=display_word)
        
        # Update used letters display
        used_text = "USED LETTERS: " + ", ".join(sorted(self.used_letters))
        self.used_label.config(text=used_text)
        
        self.update_hangman_canvas()
    
    def update_hangman_canvas(self):
        self.canvas.delete("all")
        
        # Draw gallows
        self.canvas.create_line(50, 250, 200, 250, width=5)  # base
        self.canvas.create_line(125, 250, 125, 50, width=5)  # pole
        self.canvas.create_line(125, 50, 225, 50, width=5)   # top
        self.canvas.create_line(225, 50, 225, 80, width=5)   # rope
        
        lives_remaining = self.lives
        
        # Draw hangman based on lives lost
        lives_lost = self.max_lives - self.lives
        
        if lives_lost >= 1:
            self.canvas.create_oval(200, 80, 250, 130, width=3)  # head
        
        if lives_lost >= 2:
            self.canvas.create_line(225, 130, 225, 190, width=3)  # body
        
        if lives_lost >= 3:
            self.canvas.create_line(225, 145, 195, 165, width=3)  # left arm
        
        if lives_lost >= 4:
            self.canvas.create_line(225, 145, 255, 165, width=3)  # right arm
        
        if lives_lost >= 5:
            self.canvas.create_line(225, 190, 195, 220, width=3)  # left leg
        
        if lives_lost >= 6:
            self.canvas.create_line(225, 190, 255, 220, width=3)  # right leg
        
        if lives_lost >= 7:
            self.canvas.create_text(225, 110, text="X", font=("Arial", 16))  # left eye
        
        if lives_lost >= 8:
            self.canvas.create_text(235, 110, text="X", font=("Arial", 16))  # right eye
        
        if lives_lost >= 9:
            self.canvas.create_line(215, 120, 235, 125, width=2)  # mouth sad
        
        if lives_lost >= 10:
            self.canvas.create_text(200, 105, text="💧", font=("Arial", 14))  # tear
            self.canvas.create_text(235, 105, text="💧", font=("Arial", 14))
    
    def make_guess(self, letter):
        if letter in self.used_letters:
            messagebox.showwarning("Already Used", f"You already guessed '{letter}'!")
            return
        
        self.used_letters.add(letter)
        self.letter_buttons[letter].config(state=tk.DISABLED, bg="#95a5a6")
        
        if letter in self.word_letters:
            self.word_letters.remove(letter)
            if len(self.word_letters) == 0:
                self.game_won()
        else:
            self.lives -= 1
            if self.lives == 0:
                self.game_lost()
        
        self.update_display()
    
    def game_won(self):
        messagebox.showinfo(
            "Congratulations! 🎉",
            f"You guessed the word '{self.secret_word}'\n\nYou saved the hangman!"
        )
        for btn in self.letter_buttons.values():
            btn.config(state=tk.DISABLED)
        
        # Ask to play again
        if messagebox.askyesno("Play Again?", "Would you like to play another round?"):
            self.new_game()
    
    def game_lost(self):
        messagebox.showerror(
            "Game Over! 💀",
            f"The word was '{self.secret_word}'\n\nThe hangman has been hanged!"
        )
        for btn in self.letter_buttons.values():
            btn.config(state=tk.DISABLED)
        
        # Ask to play again
        if messagebox.askyesno("Play Again?", "Would you like to try again?"):
            self.new_game()

def main():
    root = tk.Tk()
    game = HangmanGame(root)
    root.mainloop()

if __name__ == "__main__":
    main()