function parseInput(input: string): number[][] {
   const lines = input.split("\n");
   const strings = lines.map(line => line.split(" "));
   const items = strings.map(line => line.map(string => parseInt(string)));
   return items;
}

function checkInput(items: number[][]) {
   function check(condition: boolean, message: string) {
      if (condition) {
         alert(message);
         throw new Error("Bad input");
      }
   }

   const n = items[0][0];
   const m = items[0][1];
   const changes = items.slice(1);

   check(items[0].length !== 2, `Klaida - pirmoje eilutėje privalo būti lygiai du skaičiai, dabar: '${items[0].length}'`);
   check(isNaN(n) || n < 3 || n > 200000, `Klaida - netinkamas rutuliukų skaičius N: '${n}'`);
   check(isNaN(m) || m < 1 || m > 400000, `Klaida - netinkamas pagaliukų skaičius M: '${m}'`);
   check(changes.length !== m, `Klaida - pakeitimų skaičius nesutampa su pagaliukų skaičiumi: '${changes.length}' nelygu '${m}'`);

   changes.forEach((change, i) => {
      const a = change[0];
      const b = change[1];

      check(change.length !== 2, `Klaida - kiekvienoje eilutėje privalo būti lygiai 2 skaičiai: '${change.length}' ('${i + 1}' eil.)`);
      check(isNaN(a) || a < 0 || a > n - 1, `Klaida - netinkamas rutuliuko skaičius a: '${a}' ('${i + 1}' eil.)`);
      check(isNaN(b) || b < 0 || b > n - 1, `Klaida - netinkamas rutuliuko skaičius b: '${b}' ('${i + 1}' eil.)`);
      check(a === b, `Klaida - rutuliukai a ir b negali būti tas pats: '${a} ('${i + 1}' eil.)'`);
   });
}

function calculate(changes: number[][]): number[] {
   let object: { [item: number]: number[] } = {};
   let triangles = 0;
   let result: number[] = [];

   changes.forEach(change => {
      const a = change[0];
      const b = change[1];

      if (object[a] && object[a].indexOf(b) !== -1) {
         object[a].forEach(ai => {
            object[b].forEach(bi => {
               if (ai === bi) triangles--;
            });
         });

         object[a].splice(object[a].indexOf(b), 1);
         object[b].splice(object[b].indexOf(a), 1);
      } else {
         object[a]?.forEach(ai => {
            object[b]?.forEach(bi => {
               if (ai === bi) triangles++;
            });
         });

         object[a] = [b, ...(object[a] || [])];
         object[b] = [a, ...(object[b] || [])];
      }

      result.push(triangles);
   });

   return result;
}

function stringifyOutput(result: number[]): string {
   const output = result.join("\n");
   return output;
}

function main(input: string): string {
   const items = parseInput(input);
   checkInput(items);

   const result = calculate(items.slice(1));
   return stringifyOutput(result);
}
