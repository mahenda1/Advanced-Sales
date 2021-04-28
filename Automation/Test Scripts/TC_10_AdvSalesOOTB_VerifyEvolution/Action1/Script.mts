'###################################################################################################################
'Test Script Name: TC_09_AdvSalesOOTB_BrowserClose
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:
'Designed Date(MM/DD/YY): 11/29/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Advanced Sales\Automation\Test Data\Advanced Sales.xls"
TestScriptName = "TC_09_AdvSalesOOTB_BrowserClose"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)<>0 Then
		strScriptLoc = DataTable.Value("ScriptLoc")
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
Repositoriescollection.Add DirPath&"\Object Repository\AdvSale1.tsr"
LoadFunctionLibrary DirPath&"\Function Library\EvolutionLogin.qfl"
wait (2)

Call fnEvolutionLogin()

On Error Goto 0
ExitRun
