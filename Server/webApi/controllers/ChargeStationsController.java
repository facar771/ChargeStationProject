package station.chargeStation.webApi.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import station.chargeStation.business.abstracts.ChargeStationService;
import station.chargeStation.entities.concretes.ChargeStation;

@RestController
@RequestMapping("/api/chargestation")
public class ChargeStationsController {
	
	private ChargeStationService chargeStationService;

	@Autowired
	public ChargeStationsController(ChargeStationService chargeStationService) {
		this.chargeStationService = chargeStationService;
	}
	
	// *************** GET ***************
	
	@GetMapping("/getlocationall")
	public List<String> getLocationAll(){
		System.out.println("getlocationall");
		return chargeStationService.getLocationAll();
	}
	
	@GetMapping("/getstationall")
	public List<ChargeStation> getAllStations(){
		System.out.println("getstationall");
		return chargeStationService.getAllStation();
	}
	
	@GetMapping("/getstationkw")
	public int getStationsKw(){
		System.out.println("Şarj İstasyonu Sunucu bağlantısı");
		return chargeStationService.getKwChargeStation();
	}
	
	// *************** POST ***************
	
	@PostMapping("/poststationinfo") //         	İSTASYON İLE KULLANICI BAĞLAMA
	public int chargeStationInfo(@RequestBody Map<String, Object> request) {
	    String qrCode = (String) request.get("qrCode");
	    int userId = (int) request.get("userId");
	    System.out.println("qrCode: " + qrCode);
	    System.out.println("userId: " + userId);
	    return chargeStationService.chargeStationInfo(qrCode, userId);
	}
	
	@PostMapping("/poststationuserdisconnect") //         	İSTASYON İLE KULLANICI BAĞLANTI KOPARMA
	public int postStationUserdisconnect(@RequestBody ChargeStation chargeStation) {
	    
	    System.out.println("Sarj Istasyonu Id: "+chargeStation.getId());
	    System.out.println("User Id: "+chargeStation.getUser().getId());
	    return chargeStationService.postStationUserDisconnect(chargeStation);
	}
	
	@PostMapping("/poststationuserconnectcheck")
	public int postStationUserConnectCheck(@RequestParam("userId") Integer userId) {
	    System.out.println("UserId: " + userId);
	    return chargeStationService.postStationUserConnectCheck(userId);
	}
	//chargeStartStopConfirm
	@PostMapping("/postchargestartstopconfirm")
	public int chargeStartStopConfirm(@RequestBody ChargeStation chargeStation) {
	    System.out.println("ChargeStationId: " + chargeStation);
	    return chargeStationService.chargeStartStopConfirm(chargeStation);
	}
	
	@PostMapping("/poststationchargestart") //ŞARJI BAŞLAT
	public String ChargeStationStart(@RequestBody ChargeStation stationInfo) {
		System.out.println("Sarj Baslatildi: " + stationInfo);
		return chargeStationService.chargeStationChargeStart(stationInfo);
	}
	
	@PostMapping("/poststationchargestop") //ŞARJI DURDUR
	public String ChargeStationStop(int stationId) {
		System.out.println("Sarj Durduruldu: " + stationId);
		return chargeStationService.chargeStationChargeStop(stationId);
	}
	
	@PostMapping("/postkw")
	public void postKw(@RequestBody ChargeStation chargeStation) {
		chargeStationService.postKw(chargeStation.getKW(), chargeStation.getId());
		System.out.println("Sarj Istasyonu KW yolladi");
	}
	
	@PostMapping("/postkwstring")
	public void postKwString(String station) {
		System.out.println("gelen veri: " + station);
	}
	
	@PostMapping("/poststationconfirm") // TAKVİMDE MEŞGUL ŞARJ İSTASYONUNA 2 saat süre tanımak için
	public boolean postStationConfirm(int stationId) {
		return chargeStationService.postStationConfirm(stationId);
	}
	
	@PostMapping("/poststationstartinfo")
	public boolean postStationStartInfo (int stationId) {
		return chargeStationService.postStationStartInfo(stationId);
	}
	
	@PostMapping("/postkwuser")
	public int postKwUser(int userId) {
		return chargeStationService.postKwUser(userId);
	}
	
	@PostMapping("/postkwstation")
	public int postKwStation(int stationId) {
		return chargeStationService.postKwStation(stationId);
	}
	
	@PostMapping("/postprice")
	public int postPrice(int stationId) {
		return chargeStationService.postPrice(stationId);
	}
	
	@PostMapping("/poststationip")// burası akif ,consumes= {"application/json"}
	public int postStationIp(Integer chargeStationId, @RequestBody ChargeStation jsonData) {
		ChargeStation chargeStation = new ChargeStation();
		chargeStation = jsonData;
		chargeStation.setId(chargeStationId);
		System.out.println(chargeStation);
		return chargeStationService.postStationSituations(chargeStation);
	}
	
	@PostMapping("/poststationsituations")
	public int postStationSituations(@RequestBody ChargeStation chargeStationSituations) {
		System.out.println("sarj istasyonu" + chargeStationSituations);
		return chargeStationService.postStationSituations(chargeStationSituations);
	}
	
	@PostMapping("/poststationidmobil")
	public ChargeStation postStationIdMobil(@RequestBody ChargeStation chargeStation) {
		System.out.println("mobil bilgi istegi atti");
		System.out.println(chargeStation.getId());
		return chargeStationService.postStationIdMobil(chargeStation);
	}
	
	@PostMapping("/postchargepermission")
	public int postChargePermission(@RequestBody ChargeStation chargeStation) {
		System.out.println("postchargepermission");
		return chargeStationService.postChargePermission(chargeStation);
	}
	
	@PostMapping("/postchargeprice")
	@CrossOrigin(origins = "http://45.141.151.31:8080")
	public int postChargePrice(@RequestBody ChargeStation chargeStation) {
		System.out.println("elektrik fiyati webdeb geldi");
		return chargeStationService.postChargePrice(chargeStation);
	}
	
	@PostMapping("/postchargestationprice")
	@CrossOrigin(origins = "http://45.141.151.31:8080")
	public float postChargeStationPrice(@RequestBody ChargeStation chargeStation) {
		System.out.println("elektrik fiyati cekti");
		return chargeStationService.postChargeStationPrice(chargeStation);
	}
	
	@PostMapping("/postchargepay")
	public int postChargePay(@RequestBody ChargeStation chargeStation) {
		return chargeStationService.postChargePay(chargeStation);
	}
	
	//********************************************WebSite********************************************
	
	@PostMapping("/postaddchargestation")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public int postAddChargeStation(@RequestBody ChargeStation chargeStation) {
		System.out.println("Yeni bir istasyon eklendi");
		return chargeStationService.postAddChargeStation(chargeStation);
	}
	
}






