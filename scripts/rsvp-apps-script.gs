/**
 * RSVP sink for "Trung & Thảo_Guest Management".
 *
 * Paste this over the whole of the sheet's Apps Script, then
 * Deploy -> Manage deployments -> edit the existing web app -> New version,
 * so RSVP_WEBHOOK_URL keeps pointing at it.
 *
 * Three things changed from the version before it:
 *
 *   1. The row is built from the header row by name, not by position. Columns
 *      can be added, reordered or left out and nothing has to change here —
 *      adding "Ghi chú" to the sheet is enough to start recording it.
 *   2. The address is read from `email`, falling back to `contact`, which is
 *      what the older site sent.
 *   3. Writes are serialised. `getLastRow()` followed by `appendRow()` is a
 *      race: two guests replying in the same second both read the same last
 *      row and are numbered the same. A lock closes that.
 */

const SHEET_NAME = 'RSVP';

/** Header text -> the value that belongs under it. */
function rowFor(data, no) {
  return {
    'No': no,
    'Họ và tên': data.name || '',
    'SĐT / Email': data.email || data.contact || '',
    'Tham dự': data.attending === 'no' ? 'Không' : 'Có',
    'Số người': data.guests || 0,
    'Yêu cầu về ẩm thực': data.dietary || '',
    'Ghi chú': data.note || '',
    'Lời chúc': data.message || '',
    'Updated': data.submittedAt || new Date().toISOString(),
  };
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    // A reply is never worth losing; wait rather than fail if one is mid-write.
    lock.waitLock(20000);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Không tìm thấy sheet "' + SHEET_NAME + '"');

    const data = JSON.parse(e.postData.contents);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = rowFor(data, sheet.getLastRow());

    // Anything the sheet asks for that we do not have is left blank, and
    // anything we have that the sheet has no column for is simply not written.
    sheet.appendRow(headers.map(function (header) {
      const key = String(header).trim();
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : '';
    }));

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
