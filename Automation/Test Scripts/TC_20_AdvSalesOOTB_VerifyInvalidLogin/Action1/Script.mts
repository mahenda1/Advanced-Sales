'###################################################################################################################
'Test Script Name: TC_04_AdvSalesOOTB_InvalidCredential
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:
'Designed Date(MM/DD/YY): 11/29/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Advanced Sales\Automation\Test Data\Advanced Sales.xls"
TestScriptName = "TC_04_AdvSalesOOTB_InvalidCredential"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)<>0 Then
		strScriptLoc = DataTable.Value("ScriptLoc")
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")		
		Exit For
	End If
Next
	
'Using for jenkins
'strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\Object Repository\XstoreRepository.tsr"
wait (2)
Set objkeys = createobject("Wscript.Shell")
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back Office").Exist(2) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Back Office").Click
End If
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Set strUsername
objkeys.SendKeys "{ENTER}"
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").SetSecure strPassword
objkeys.SendKeys "{ENTER}"

If JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").exist(2) or JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").exist(2) then
	Reporter.ReportEvent micFail, "Login to backoffice","Test step failed"
Else
	Reporter.ReportEvent micPass, "No Login to backoffice","Test step passed"
	JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
End If

On Error Goto 0
ExitRun
