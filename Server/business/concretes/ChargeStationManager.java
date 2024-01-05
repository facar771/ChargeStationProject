package station.chargeStation.business.concretes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import station.chargeStation.business.abstracts.ChargeStationService;
import station.chargeStation.dataAccess.abstracts.ChargeStationRepository;
import station.chargeStation.dataAccess.abstracts.UserRepository;
import station.chargeStation.entities.concretes.ChargeStation;
import station.chargeStation.entities.concretes.User;

@Service
public class ChargeStationManager implements ChargeStationService{

	ChargeStationRepository chargeStationRepository;
	UserRepository userRepository;
	
	public ChargeStationManager(ChargeStationRepository chargeStationRepository, UserRepository userRepository) {
		this.chargeStationRepository = chargeStationRepository;
		this.userRepository = userRepository;
	}
	
	// *************** GET ***************

	@Override
	public List<String> getLocationAll() {
		
		List<ChargeStation> chargeStations;
		List<String> locations = new ArrayList<>();
		
		chargeStations = chargeStationRepository.findAll();
		
		if (chargeStations != null) {
			for(ChargeStation chargeStation : chargeStations) {
				String location = chargeStation.getLocation();
				locations.add(location);
			}
		}
		return locations;
	}
	
	public List<ChargeStation> getAllStation(){
		return chargeStationRepository.findAll();
	}
	
	public int getKwChargeStation() {
		ChargeStation chargeStationNew = chargeStationRepository.findById(1).get();
		int kW = chargeStationNew.getKW();
		return kW;
	}
	
	@Override
	public boolean postStationConfirm(int stationId) {
		boolean stationConfirm = false;
		int newStationId = 0;
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		for(ChargeStation newStation : chargeStations) {
			newStationId = newStation.getId();
			if(newStationId == stationId) {
				stationConfirm = newStation.getChargeConfirm();
			}
		}
		return stationConfirm;
	}
	
	// *************** POST ***************

	@Override
	public String chargeStationReservation(Integer userId, int chargeStationId, String reservation) {
		String message;
		ChargeStation newStation = chargeStationRepository.findById(chargeStationId).get();
		newStation.setReservation(reservation);
		message = "Rezerve Basarili";
		return message;
	}

	@Override
	public String postIp(Integer chargeStationId) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		String response = "0";
		
		for(ChargeStation newStation : chargeStations) {
			if(chargeStationId.equals(newStation.getId()) && !newStation.getChargeConfirm()) {
				response = "001";
			}
			else if(chargeStationId.equals(newStation.getId()) && newStation.getChargeConfirm()) {
				response = "002";
			}
			else {
				
			}
		}
		return response;
	}

	@Override
	public int chargeStationInfo(String qrCode, int userId) {
		
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		List<User> users = userRepository.findAll();
		int newStationId = 0;
		for(ChargeStation newStation : chargeStations) {
			String newQrCode = newStation.getQrCode();
			if(qrCode.indexOf(newQrCode) >= 0) {
				if(newStation.getUser() == null) {
					for(User newUser : users) {
				    	if(newUser.getId() == userId) {
				    		newStationId = newStation.getId();
				    		newStation.setUser(newUser);
				    		chargeStationRepository.save(newStation);
				    	}
				    }
				}
				else if(newStation.getUser().getId() == userId) {
					newStationId = newStation.getId();
					System.out.println("Bu Sarj Istasyonu Dogru Kisi Ile Baglandi");
				}
				else {
					System.out.println("Bu Sarj Istasyonu Baska Bir Kullanicida");
				}
			}
		}
		return newStationId;
	}
	
	@Override
	public int postStationUserConnectCheck(Integer userId) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargeStationId = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getUser() == null) {
				System.out.println("Bazilari Null");
			}	
			else if(newStation.getUser().getId() == userId) {
				chargeStationId = newStation.getId();
				System.out.println("Istasyona giris yapildi: "+ userId);
			}	
			else {
				
			}
		}
		return chargeStationId;
	}
	
	@Override
	public int postStationUserDisconnect(ChargeStation chargeStation) {
		int successful = 0;
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		List<User> users = userRepository.findAll();
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				for(User newUser : users) {
					if(newUser.getId() == chargeStation.getUser().getId()) {
						successful = 1;
						newStation.setUser(null);
						chargeStationRepository.save(newStation);
						System.out.println("ıstasyondan cıkıldı");
					}
				}
			}
		}
		return successful;
	}
	
	@Override
	public String chargeStationChargeStart(@RequestBody ChargeStation stationInfo) {
		String message = "Basarisiz";
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		for(ChargeStation newStation : chargeStations) {

			if(newStation.getId() == stationInfo.getId()) {
				
				if(newStation.getUser() != null) {
					newStation.setChargeConfirm(false);
					newStation.setFirstKw(newStation.getKW());
					newStation.setUser(stationInfo.getUser());
					chargeStationRepository.save(newStation);
					message = "Basarili";
				}
			}
		}
		return message;
	}
	
	@Override
	public String chargeStationChargeStop(int stationId) {
		String message = "Basarisiz";
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		for(ChargeStation newStation : chargeStations) {
			
			if(newStation.getId() == stationId) {
				System.out.println(stationId);
				newStation.setChargeConfirm(true);
				newStation.setUser(null);
				chargeStationRepository.save(newStation);
				message = "Basarili";
			}
		}
		return message;
	}

	@Override
	public void postKw(@RequestBody int kw , @RequestBody int id) {
		System.out.println("gelen kw="+kw + " gelen id = "+id);
		ChargeStation newChargeStation = chargeStationRepository.findById(id).get();

		if(newChargeStation.getChargeConfirm() && !newChargeStation.getChargeStartStop()) { // 002 Sarjı durdurma veya başlamamış şarj
			newChargeStation.setFirstKw(kw);
		}
		else if(!newChargeStation.getChargeConfirm()) { // 001 Şarj başlatıldı
			newChargeStation.setKW(kw);
			newChargeStation.setChargeStartStop(true);
		}
		else if(newChargeStation.getChargeConfirm() && newChargeStation.getChargeStartStop()) {
			newChargeStation.setKW(kw);
			newChargeStation.setChargeStartStop(false);
		}
		
		chargeStationRepository.save(newChargeStation);
	}
	
	@Override
	public boolean postStationStartInfo(int stationId) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		Boolean chargeStartInfo = null;
		for(ChargeStation chargeStationNew : chargeStations) {
			if(chargeStationNew.getId() == stationId) {
				chargeStartInfo = chargeStationNew.getChargeStartStop();
			}
		}
		System.out.println("Sarj Bilgisi Soruldu: " + chargeStartInfo);
		return chargeStartInfo;
	}

	@Override
	public int postKwUser(int userId) {
		int totalKw = 0;
		List<User> users = userRepository.findAll();
		for(User userNew : users) {
			if(userNew.getId() == userId) {
				ChargeStation chargeStationNew = userNew.getChargeStation();
				totalKw = userNew.getChargeStation().getKW() - userNew.getChargeStation().getFirstKw();
				chargeStationRepository.save(chargeStationNew);
			}
			System.out.println(totalKw);
		}
		return totalKw;
	}
	
	@Override
	public int postKwStation(int stationId) {
		int totalKw = 0;
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == stationId) {
				totalKw = newStation.getKW() - newStation.getFirstKw();
			}
		}
		System.out.println("Total KW: " + totalKw);
		return totalKw;
	}

	@Override
	public int postPrice(int stationId) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int price = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == stationId) {
				price = newStation.getPrice();
			}
		}
		return price;
	}
	
	//*************************Charge Station*************************

	@Override
	public int postStationSituations(ChargeStation chargeStationSituations) {
		
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargePermission = -1;
		for(ChargeStation newStation : chargeStations) {
			if(chargeStationSituations.getId() == newStation.getId()) {
				if(newStation.getChargeStartStopConfirm() !=null && newStation.getChargeStartStopConfirm() == 0) {
					chargePermission = 0;
					System.out.println("getChargeStartStopConfirm '0' oldu ");
				}
				if(newStation.getChargeStartStopConfirm() !=null && newStation.getChargeStartStopConfirm() == 1) {
					chargePermission = 1;
					System.out.println("getChargeStartStopConfirm '1' oldu ");
				}
				if(newStation.getChargeStartStopConfirm() !=null && newStation.getChargeStartStopConfirm() == 2) {
					chargePermission = 2;
					System.out.println("getChargeStartStopConfirm '2' oldu ");
				}
				if(newStation.getChargeStartStopConfirm() !=null && chargeStationSituations.getOcp() != null && chargeStationSituations.getOcp() == 0) {
					//chargePermission = 0;
				}
				if(chargeStationSituations.getOcp() != null && chargeStationSituations.getOcp() == 1) {
					newStation.setPsdt(chargeStationSituations.getPsdt());
					newStation.setPstdt(chargeStationSituations.getPstdt());
					newStation.setSkw(chargeStationSituations.getSkw());
					newStation.setLkw(chargeStationSituations.getLkw());
					newStation.setTkw(chargeStationSituations.getTkw());
					newStation.setIac(chargeStationSituations.getIac());
					newStation.setPs(chargeStationSituations.getPs());
					newStation.setCrs(chargeStationSituations.getCrs());
					newStation.setCfs(chargeStationSituations.getCfs());
					newStation.setOcp(1);
					System.out.println("ocp 1 geldi sarj istasyonundan");
					chargeStationRepository.save(newStation);
				}
				if(chargeStationSituations.getOcp() != null && chargeStationSituations.getOcp() == 2) {
					newStation.setPsdt(chargeStationSituations.getPsdt());
					newStation.setPstdt(chargeStationSituations.getPstdt());
					newStation.setSkw(chargeStationSituations.getSkw());
					newStation.setLkw(chargeStationSituations.getLkw());
					newStation.setTkw(chargeStationSituations.getTkw());
					newStation.setIac(chargeStationSituations.getIac());
					newStation.setPs(chargeStationSituations.getPs());
					newStation.setCrs(chargeStationSituations.getCrs());
					newStation.setCfs(chargeStationSituations.getCfs());
					newStation.setChargeStartStopConfirm(0);
					System.out.println("ocp 2 geldi sarj istasyonundan");
					chargePermission = 0;// bunu düşün
					newStation.setOcp(2); // BUNDAN SONRA BİŞEY KOYMA
					chargeStationRepository.save(newStation);
				}
				else {
					
				}
			}
		}
		return chargePermission;
	}

	@Override
	public String charStartStopConfirm(ChargeStation chargeStation) { // BUNE YA ŞUNA Bİ BAK
		String chargeConfirm = "";
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				if(chargeStation.getChargeStartStopConfirm() == 0 && chargeStation.getChargeStartStopConfirm() != null) {
					newStation.setChargeStartStopConfirm(0);
					chargeConfirm = "Sarj Olmuyor.";;
				}
				else if(chargeStation.getChargeStartStopConfirm() == 1 && chargeStation.getChargeStartStopConfirm() != null) {
					newStation.setChargeStartStopConfirm(1);
					chargeConfirm = "Sarj Oluyor.";
				}
				else if(chargeStation.getChargeStartStopConfirm() == 2 && chargeStation.getChargeStartStopConfirm() != null) {
					newStation.setChargeStartStopConfirm(2);
					chargeConfirm = "Sarj Durduruluyor.";
				}
				else {
					System.out.println("Bu Sarj Istasyonu Rezerve edilmistir.");
					chargeConfirm = "Sarj Istasyonu Rezervlidir.";
				}
			}
		}
		
		return chargeConfirm;
	}

	@Override
	public int chargeStartStopConfirm(ChargeStation chargeStation) { // MOBİLDEN ŞARJI BAŞLAT DURDUR komutları.
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargeStartStopConfirm = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				System.out.println(chargeStation.getChargeStartStopConfirm());
				newStation.setChargeStartStopConfirm(chargeStation.getChargeStartStopConfirm());
				chargeStationRepository.save(newStation);
				chargeStartStopConfirm = 1;
			}
		}
		return chargeStartStopConfirm;
	}

	@Override
	public ChargeStation postStationIdMobil (ChargeStation chargeStation) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		ChargeStation chargeStationNew = null;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()){
				chargeStationNew = newStation;
				System.out.println(chargeStationNew.getTkw());
			}
		}
		return chargeStationNew;
	}

	@Override
	public int postChargePermission(ChargeStation chargeStation) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargePermission = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				chargePermission = newStation.getOcp();
			}
		}
		return chargePermission;
	}

	@Override
	public int postChargePrice(ChargeStation chargeStation) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargePrice = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				newStation.setPrice(chargeStation.getPrice());
				chargePrice = 1;
			}
		}
		return chargePrice;
	}	
	
	@Override
	public float postChargeStationPrice(ChargeStation chargeStation) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		float chargePrice = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				newStation.setPrice(chargeStation.getPrice());
				chargePrice = 1;
			}
		}
		return chargePrice;
	}	
	
	@Override
	public int postChargePay(ChargeStation chargeStation) {
		List<ChargeStation> chargeStations = chargeStationRepository.findAll();
		int chargePrice = 0;
		for(ChargeStation newStation : chargeStations) {
			if(newStation.getId() == chargeStation.getId()) {
				newStation.setTkw(0.0);
				chargeStationRepository.save(newStation);
				chargePrice = 1;
			}
		}
		return chargePrice;
	}

	@Override
	public int postAddChargeStation(ChargeStation chargeStation) {
		
		return 1;
	}	
	
	
}





