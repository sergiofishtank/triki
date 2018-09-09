/* Triki.java
 * By Frank McCown (Harding University)
 * 
 * This is a tic-tac-toe game that runs in the console window.  The human
 * is X and the computer is O. 
 */

	var mBoard = ['1','2','3','4','5','6','7','8','9'];
	var BOARD_SIZE = 9;
	
	var HUMAN_PLAYER = 'X';
	var COMPUTER_PLAYER = 'O';
	
	var  mRand; 

	
	Triki();
	
	function Triki() {
		
		// Seed the random number generator
		//mRand = new Random(); 
				
		var turn = HUMAN_PLAYER;    // Human starts first
		var win = 0;                // Set to 1, 2, or 3 when game is over
		
		// Keep looping until someone wins or a tie
		while (win == 0)
		{	
			displayBoard();

			if (turn == HUMAN_PLAYER)
			{
				getUserMove();
				displayBoard();
				turn = COMPUTER_PLAYER;
			}
			else
			{
				getComputerMove();
				displayBoard();
				turn = HUMAN_PLAYER;
			}	

			win = checkForWinner();
		}

		displayBoard();

		// Report the winner
		//document.write();
		
		if (win == 1)
			alert("It's a tie.");
		else if (win == 2)
			alert(HUMAN_PLAYER + " wins!");
		else if (win == 3)
			alert(COMPUTER_PLAYER + " wins!");
		else
			alert("There is a logic problem!");
	}
	
	function displayBoard()	{
		document.write("<br/>");
		document.write(mBoard[0] + " | " + mBoard[1] + " | " + mBoard[2] + "<br/>");
		document.write("-----------<br/>");
		document.write(mBoard[3] + " | " + mBoard[4] + " | " + mBoard[5]+ "<br/>");
		document.write("-----------<br/>");
		document.write(mBoard[6] + " | " + mBoard[7] + " | " + mBoard[8]+ "<br/>");
		document.write("<br/>");

		console.log("");
		console.log(mBoard[0] + " | " + mBoard[1] + " | " + mBoard[2]);
		console.log("-----------");
		console.log(mBoard[3] + " | " + mBoard[4] + " | " + mBoard[5]);
		console.log("-----------");
		console.log(mBoard[6] + " | " + mBoard[7] + " | " + mBoard[8]);
		console.log("");
	}
	
	// Check for a winner.  Return
	//  0 if no winner or tie yet
	//  1 if it's a tie
	//  2 if X won
	//  3 if O won
	function checkForWinner() {
		
		// Check horizontal wins
		for (var i = 0; i <= 6; i += 3)	{
			if (mBoard[i] == HUMAN_PLAYER && 
				mBoard[i+1] == HUMAN_PLAYER &&
				mBoard[i+2]== HUMAN_PLAYER)
				return 2;
			if (mBoard[i] == COMPUTER_PLAYER && 
				mBoard[i+1]== COMPUTER_PLAYER && 
				mBoard[i+2] == COMPUTER_PLAYER)
				return 3;
		}
	
		// Check vertical wins
		for (var i = 0; i <= 2; i++) {
			if (mBoard[i] == HUMAN_PLAYER && 
				mBoard[i+3] == HUMAN_PLAYER && 
				mBoard[i+6]== HUMAN_PLAYER)
				return 2;
			if (mBoard[i] == COMPUTER_PLAYER && 
				mBoard[i+3] == COMPUTER_PLAYER && 
				mBoard[i+6]== COMPUTER_PLAYER)
				return 3;
		}
	
		// Check for diagonal wins
		if ((mBoard[0] == HUMAN_PLAYER &&
			 mBoard[4] == HUMAN_PLAYER && 
			 mBoard[8] == HUMAN_PLAYER) ||
			(mBoard[2] == HUMAN_PLAYER && 
			 mBoard[4] == HUMAN_PLAYER &&
			 mBoard[6] == HUMAN_PLAYER))
			return 2;
		if ((mBoard[0] == COMPUTER_PLAYER &&
			 mBoard[4] == COMPUTER_PLAYER && 
			 mBoard[8] == COMPUTER_PLAYER) ||
			(mBoard[2] == COMPUTER_PLAYER && 
			 mBoard[4] == COMPUTER_PLAYER &&
			 mBoard[6] == COMPUTER_PLAYER))
			return 3;
	
		// Check for tie
		for (var i = 0; i < BOARD_SIZE; i++) {
			// If we find a number, then no one has won yet
			if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER)
				return 0;
		}
	
		// If we make it through the previous loop, all places are taken, so it's a tie
		return 1;
	}
	
	function getUserMove() 
	{
		// Eclipse throws a NullPointerException with Console.readLine
		// Known bug: https://bugs.eclipse.org/bugs/show_bug.cgi?id=122429
		//Console console = System.console();
		
		
		
		var move = -1;
		
		while (move == -1) {			
			try {
				
				move=prompt("Enter your move:");
			   
			
				while (move < 1 || move > BOARD_SIZE || 
					   mBoard[move-1] == HUMAN_PLAYER || mBoard[move-1] == COMPUTER_PLAYER) {
					
					if (move < 1 || move > BOARD_SIZE)
						alert("Please enter a move between 1 and " + BOARD_SIZE + ".");
					else
						alert("That space is occupied.  Please choose another space.");
		
				    move = prompt("Enter your move:");
				}
			} 
			catch (err) {
				alert("Please enter a number between 1 and " + BOARD_SIZE + ".");
				s.next();  // Get next line so we start fresh
				move = -1;
			}
		}

		mBoard[move-1] = HUMAN_PLAYER;
	}
	
	function getComputerMove() 
	{
		var move;

		// First see if there's a move O can make to win
		for (var i = 0; i < BOARD_SIZE; i++) {
			if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {
				var curr = mBoard[i];
				mBoard[i] = COMPUTER_PLAYER;
				if (checkForWinner() == 3) {
					alert("Computer is moving to " + (i + 1));
					return;
				}
				else
					mBoard[i] = curr;
			}
		}

		// See if there's a move O can make to block X from winning
		for (var i = 0; i < BOARD_SIZE; i++) {
			if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {
				var curr = mBoard[i];   // Save the current number
				mBoard[i] = HUMAN_PLAYER;
				if (checkForWinner() == 2) {
					mBoard[i] = COMPUTER_PLAYER;
					alert("Computer is moving to " + (i + 1));
					return;
				}
				else
					mBoard[i] = curr;
			}
		}

		// Generate random move
		do
		{
			move =  Math.floor(Math.random()*mBoard.length)+1;
		} while (mBoard[move] == HUMAN_PLAYER || mBoard[move] == COMPUTER_PLAYER);
			
		alert("Computer is moving to " + (move + 1));

		mBoard[move] = COMPUTER_PLAYER;
	}	
	
	
	/**
	 * @param args
	 */
	/*public static void main(String[] args) {		
		new Triki();		
	}*/
