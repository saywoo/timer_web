/*
Levenshtein distance 알고리즘을 이용해서 두 문자열의 유사도를 cost로 판별해 리턴하는 함수
cost = 문자열에서 변경, 삽입, 삭제 등의 요소를 해서 고쳐야하는 문자의 수
*/

function getDist(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    // 변경, 삽입, 삭제 등의 cost를 저장하는 2차원 배열
    var matrix = [];

    // 배열 초기화
    for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }

    // 2차원 배열에 dp 알고리즘을 이용해서 비용을 계산해감
    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i-1][j-1];
            else {
                // 변경, 삽입, 삭제 중 가장 작은 값을 배열에 저장
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
            }
        }
    }

    //cost를 return해줌
    return matrix[b.length][a.length];
}