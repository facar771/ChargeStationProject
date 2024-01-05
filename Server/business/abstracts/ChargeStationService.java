package station.chargeStation.business.abstracts;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import station.chargeStation.entities.concretes.ChargeStation;

public interface ChargeStationService {
	List<String> getLocationAll();
	List<ChargeStation> getAllStation();
	int getKwChargeStation();
	
	// *************** POST ***************
	
	String chargeStationReservation(Integer userId, int chargeStationId, String reservation);
	String postIp(Integer chargeStationId);
	int chargeStationInfo(String qrCode, int userId);
	String chargeStationChargeStart(ChargeStation stationInfo);
	String chargeStationChargeStop(int stationId);
	void postKw(int kw , int id);
	boolean postStationConfirm(int stationId);
	boolean postStationStartInfo(int stationId);
	int postKwStation(int stationId);
	int postKwUser(int userId);
	int postPrice(int stationId);
	int postStationSituations(ChargeStation chargeStationSituations);
	String charStartStopConfirm(ChargeStation chargeStation);
	int postStationUserDisconnect(ChargeStation chargeStation);
	int postStationUserConnectCheck(Integer userId);
	int chargeStartStopConfirm(ChargeStation chargeStation);
	ChargeStation postStationIdMobil(ChargeStation chargeStation);
	int postChargePermission(@RequestBody ChargeStation chargeStation);
	int postChargePrice(ChargeStation chargeStation);
	float postChargeStationPrice(ChargeStation chargeStation);
	int postChargePay(ChargeStation chargeStation);
	int postAddChargeStation(ChargeStation chargeStation);
}






