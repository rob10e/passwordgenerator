// Source: http://multicians.org/thvv/gpw-js.html

import passwordScore from './passwordStrengthTester';
import data from './pronounceableData';

/* GPW - Generate pronounceable passwords
   This program uses statistics on the frequency of three-letter sequences
   in English to generate passwords.  The statistics are
   generated from your dictionary by the program load_trigram.

   See www.multicians.org/thvv/gpw.html for history and info.
   Tom Van Vleck

   THVV 06/01/94 Coded
   THVV 04/14/96 converted to Java
   THVV 07/30/97 fixed for Netscape 4.0
   THVV 11/27/09 ported to Javascript
*/

class GPW {
  /**
   * var pw = GPW.pronounceable(10);
   */

  pronounceable(pwl) {
    let output = '';
    let c1;
    let c2;
    let c3;
    let sum = 0;
    let nchar;
    let ranno;
    // let pwnum;
    let pik;

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // letter frequencies
    const trigram = data;
    // Pick a random starting point.
    pik = Math.random(); // random number [0,1]
    ranno = pik * 125729.0;
    sum = 0;
    for (c1 = 0; c1 < 26; c1++) {
      for (c2 = 0; c2 < 26; c2++) {
        for (c3 = 0; c3 < 26; c3++) {
          sum += trigram[c1][c2][c3];
          if (sum > ranno) {
            output += alphabet.charAt(c1);
            output += alphabet.charAt(c2);
            output += alphabet.charAt(c3);
            c1 = 26; // Found start. Break all 3 loops.
            c2 = 26;
            c3 = 26;
          } // if sum
        } // for c3
      } // for c2
    } // for c1
    // Now do a random walk.
    nchar = 3;
    while (nchar < pwl) {
      c1 = alphabet.indexOf(output.charAt(nchar - 2));
      c2 = alphabet.indexOf(output.charAt(nchar - 1));
      sum = 0;
      for (c3 = 0; c3 < 26; c3++) {
        sum += trigram[c1][c2][c3];
      }
      if (sum === 0) {
        // alert("sum was 0, outut="+output);
        break; // exit while loop
      }
      // pik = ran.nextDouble();
      pik = Math.random();
      ranno = pik * sum;
      sum = 0;
      for (c3 = 0; c3 < 26; c3++) {
        sum += trigram[c1][c2][c3];
        if (sum > ranno) {
          output += alphabet.charAt(c3);
          c3 = 26; // break for loop
        } // if sum
      } // for c3
      nchar++;
    } // while nchar

    return output;
  } // pronounceable

  generate({ samples, length }) {
    let password;
    const results = [];
    for (let index = 0; index <= samples; index++) {
      password = '';
      while (password.length < length - 1) {
        password = this.pronounceable(length);
      }
      results.push({
        password,
        message: `Length: ${length}`,
        score: passwordScore(password, { minchar: 8 }),
      });
    }

    return results;
  }
} // GPW

export default GPW;
