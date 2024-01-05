package station.chargeStation.entities.concretes;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "chargeStation")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChargeStation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "qrCode")
	private String qrCode;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "kW")
	private Integer kW;
	
	@Column(name = "price")
	private Integer price;
	
	@Column(name = "confirm")
	private Integer confirm;
	
	@Column(name = "firstkw")
	private Integer firstKw;
	
	@Column(name = "chargeConfirm")
	private Boolean chargeConfirm;
	
	@Column(name = "chargestartstop")
	private Boolean chargeStartStop;
	
	@Column(name = "reservation")
	private String reservation;
	
	@JsonBackReference
	@OneToOne
    @JoinColumn(name = "user_id") // "user" sütunu yerine "user_id" olarak adlandırılacak
    private User user;
	
	//******************************************
	
	@Column(name = "chargestartdatetime")
	private String psdt;
	
	@Column(name = "chargestopdatetime")
	private String pstdt;
	
	@Column(name = "chargestartkwvalue")
	private Double skw;
	
	@Column(name = "chargelastkwvalue")
	private Double lkw;
	
	@Column(name = "chargetotalkwvalue")
	private Double tkw;
	
	@Column(name = "chargeinstantkwvalue")
	private Double iac;
	
	@Column(name = "plugstatus")
	private Boolean ps;
	
	@Column(name = "chargeresumestatus")
	private Boolean crs;
	
	@Column(name = "chargefaillstatus")
	private String cfs;
	
	@Column(name = "chargepermission")
	private Integer ocp;
	
	@Column(name = "chargestartstopconfirm")
	private Integer chargeStartStopConfirm;
}















