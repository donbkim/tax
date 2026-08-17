/**
 * 반포자이 보유·양도 최적화 시뮬레이터 웹앱 진입점
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('banpo_xi_tax_simulator')
    .setTitle('반포자이 부동산 보유·양도 최적화 시뮬레이터')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
