'###################################################################################################################fi 0.5i^FI )
'Test Script Name: Recycle_TC_04
'Script Description: Sale is performed
'Designed By Date:Goutham
'Designed Date(MM/DD/YY): 05/01/2021
'Modified By&date: 
'###################################################################################################################

On Error Resume Next
    
DataFilePath = "C:\Advanced Sales\Automation\Test Data\Advanced Sales.xls"
TestScriptName = "Recycle_TC_04"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		IMEI1 = datatable.Value("IMEI1")
		IMEI2 = datatable.Value("IMEI2")
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
Repositoriescollection.Add DirPath&"\Object Repository\Recycle3.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\Recycle.qfl"
'LoadFunctionLibrary DirPath&"\Function Library\Recycle2.qfl"
'LoadFunctionLibrary DirPath&"\Function Library\Recycle3.qfl"

wait (2)

'Call RecyleProduct()
If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	call LoginXstore(LoginType,strUsername,strPassword)
	'Call Logout(strUsername,strPassword)
	wait 1
End If

Call RecycleSale(IMEI1,IMEI2)
'Call Recycle_TC_08()
call Logout(LoginType)
'Call RecycleAccessory()

On Error GoTo 0


exitrun @@ hightlight id_;_79782867_;_script infofile_;_ZIP::ssf215.xml_;_

