'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC_RefundsAndExchange_02
'Script Description: Refund And Exchange to change com exchange date
'Designed By Date:Goutham
'Designed Date(MM/DD/YY): 20/11/2020
'Modified By&date: 20/11/2020
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Advanced Sales\Automation\Test Data\Advanced Sales.xls"
TestScriptName = "Recycle_TC_12"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		IMEI = datatable.Value("IMEI")
		LoginType = datatable.Value("Login")
		
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
Repositoriescollection.Add DirPath&"\Object Repository\AssociateProducts.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Login.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\RefundsAndExchange.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Recycle.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Recycle2.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\Recycle.qfl"

wait (2)

'Call RecyleProduct()
If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	call LoginXstore(LoginType,strUsername,strPassword)
	'Call Logout(strUsername,strPassword)
	wait 1
End If

Call RecyleProduct(IMEI)
'Call Recycle_TC_08() @@ hightlight id_;_965505585_;_script infofile_;_ZIP::ssf67.xml_;_

'call LoginXstore(LoginType,strUsername,strPassword)
'Call RecycleAccessory()

On Error GoTo 0
 @@ hightlight id_;_919020_;_script infofile_;_ZIP::ssf109.xml_;_
exitrun
