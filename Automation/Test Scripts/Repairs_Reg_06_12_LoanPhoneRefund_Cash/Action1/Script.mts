'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Advanced Sales\Automation\Test Data\Advanced Sales.xls"
TestScriptName = "Repairs_Reg_06_3_Verify Selection Transaction"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		strNewPassword = DataTable.Value("NewPassword")
		strConformPassword = DataTable.Value("ConformPassword")
		strFirstName = DataTable.Value("FirstName")
		strLastName = Datatable.Value("LastName")
		intEINSF = Datatable.Value("EINSF")
		strEmail = Datatable.Value("Email")
		intTillLevel = Datatable.Value("TillLevel")
		intBackOfficeLevel = Datatable.Value("BackOfficeLevel")
		IMEI = Datatable.Value("IMEI")
		LoginType= Datatable.Value("Login")
		
		Exit For
	End If
Next
	
'Using for jenkins
strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\Object Repository\LocalRepo2.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Steffy.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\User Access.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout2.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Temp.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\User Access.qfl"


wait (2)
'msgbox DirPath
If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	call LoginXstore(LoginType,strUsername,strPassword)
	wait 1
End If

Call VerifyRepairKey()
Wait 2
Call VerifyPendingTransactions()
Wait 2 
'Call SelectPendingTransaction()
Wait 10
Call  Logout(LoginType)

'Call Logout(strUsername,strPassword) @@ hightlight id_;_965505585_;_script infofile_;_ZIP::ssf67.xml_;_


Function VerifyRepairKey()
	Wait 2 

JavaWindow("Oracle Retail Xstore Point").JavaButton("Additional Options").Click @@ hightlight id_;_1724549040_;_script infofile_;_ZIP::ssf1.xml_;_
Wait 2

If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Repair Payment").Exist) Then
	Reporter.ReportEvent micPass, "The repair button is present","Test case passed"
	Else
	Reporter.ReportEvent micFail, "Repair Payment not displayed","Test case failed"
End If

End Function




Function  VerifyPendingTransactions()
Set WshellOBJ = CreateObject("WScript.Shell")
Wait 2	
JavaWindow("Oracle Retail Xstore Point").JavaButton("Repair Payment").Click @@ hightlight id_;_128703127_;_script infofile_;_ZIP::ssf1.xml_;_
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve").Click @@ hightlight id_;_564941380_;_script infofile_;_ZIP::ssf2.xml_;_
Wait 5
dim valText
valText= JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextPane").GetROProperty("text")
If (Instr(valText,"No pending transactions to retrieve")>0) Then
	Wait 2
	WshellOBJ.SendKeys "{Esc}"
	Reporter.ReportEvent micPass, "No Pending transactions exists","No Pending transactions displayed"
	Else
		Reporter.ReportEvent micPass, "Pending transactions displayed","Pending transactions"
		OperatorList1=JavaWindow("Oracle Retail Xstore Point").JavaList("Repair Payment").GetROProperty("items count")
		For i = 0 To 1
		Operator = JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList").GetItem(0)
		Print Operator
		Next 
		JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
		If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Exist) Then
			Reporter.ReportEvent micPass, "The Pending Transaction is selected","Transaction is selected successfully"		
		End If 
	
End If
End Function


Function SelectPendingTransaction()
OperatorList1=JavaWindow("Oracle Retail Xstore Point").JavaList("Repair Payment").GetROProperty("items count")
For i = 0 To 1
Operator = JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList").GetItem(0)
Print Operator
Next 
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Exist) Then
	Reporter.ReportEvent micPass, "The Pending Transaction is selected","Transaction is selected successfully"
End If 
End  Function


Function RetrieveKeyVerification()
	Wait 2
	If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve").Exist) Then
		Reporter.ReportEvent micPass, "Retrieve Key is displayed","Test case passed"	
	Else
		Reporter.ReportEvent micFail, "Retreive key is not displayed","Test case passed"
	End If
	
	
End Function



Function RepairList()
	Wait 2
	If (JavaWindow("Oracle Retail Xstore Point").JavaStaticText("Repair Payment(st)").Exist) Then
		Reporter.ReportEvent micPass, "Repair list displayed","Test passed"
	Else
		Reporter.ReportEvent micFail, "Repair list not displayed","Test failed"
		
	End If
	
End Function



Function RepairListTable()
Wait 2
If (JavaWindow("Oracle Retail Xstore Point").JavaObject("DtvList$ColumnHeader").Exist) Then
	Reporter.ReportEvent micPass, "Repair Column is displayed","Test case passed"
	Else
	Reporter.ReportEvent micFail, "Repair Column is not displayed","Test case failed"
End If
	
	
End Function





On Error GoTo 0
ExitRun
