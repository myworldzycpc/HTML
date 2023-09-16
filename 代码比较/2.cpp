//Code written by Li Zexuan (Looks handsome)
#include<bits/stdc++.h>
using namespace std;

map <string, int> dy;
string s;
priority_queue<int, vector<int>, greater<int>> pq;

int main() {
	dy["one"] = 1, dy["two"] = 4, dy["three"] = 9, dy["four"] = 16, dy["five"] = 25, dy["six"] = 36, dy["seven"] = 49, dy["eight"] = 64, dy["nine"] = 81, dy["ten"] = 0;
	dy["eleven"] = 21, dy["twelve"] = 44, dy["thirteen"] = 69, dy["fourteen"] = 96, dy["fifteen"] = 25, dy["sixteen"] = 56, dy["seventeen"] = 89, dy["eighteen"] = 24;
	dy["nineteen"] = 61, dy["twenty"] = 0;
	dy["a"] = 1, dy["both"] = 4, dy["another"] = 1, dy["first"] = 1, dy["second"] = 4, dy["third"] = 9;
	for (int i = 1; i <= 6; i++) {
		cin >> s;
		if (dy[s]) {
			long long n = dy[s];
			if (dy[s] == 0) {
				continue;
			}
			pq.push(dy[s]);
		}
	}
	cout << pq.top();
	pq.pop();
	while (!pq.empty()) {
		printf("%02d", pq.top());
		pq.pop();
	}
	return 0;
}